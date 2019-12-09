/**
 * @module compiler/validator
 */

/**
 * indicative-compiler
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import isObject from 'isobject'
import getValue from 'lodash.get'
import { ParsedRule, ParsedRulesMessages } from 'indicative-parser'

import {
  ValidationDataRoot,
  ValidateFunction,
  ValidationDefination,
  CollectorContract,
} from '../Contracts'

/**
 * Runs a series of validations on a given field. This class is feeded with the
 * computed nodes generated via [[TreeWalker]].
 */
export class ValidationsRunner {
  /**
   * We toggle this flag then creating the `validations` object
   */
  public async = false

  /**
   * Collection of validations to be executed on a given field.
   */
  private validations: { async: boolean, rule: ParsedRule, fn: ValidateFunction }[] = []

  /**
   * Base pointer to this field. When field is inside an
   * array, then we need to re-compute the pointer
   * based upon the current index in which this
   * field is validated.
   *
   * However, we don't mutate this field.
   */
  private pointer = this.dotPath.concat(this.field).join('.')

  constructor (
    private field: string,
    private type: 'literal' | 'object' | 'array',
    private dotPath: string[],
    rules: ParsedRule[],
    validations: { [key: string]: ValidationDefination },
    private fieldMessages: ParsedRulesMessages,
    private genericMessages: ParsedRulesMessages,
  ) {
    this.computeValidations(validations, rules)
  }

  /**
   * Creating a list of validation functions to be executed as per
   * the defined rules.
   */
  private computeValidations (
    validations: { [key: string]: ValidationDefination },
    rules: ParsedRule[],
  ): void {
    this.validations = rules.map((rule) => {
      const validation = validations[rule.name]

      /**
       * Raise exception when validation implementation for a
       * given rule is missing.
       */
      if (!validation) {
        throw new Error(`${rule.name} is not a registered as a validation`)
      }

      /**
       * The validation node must have a `validate` function.
       */
      if (typeof (validation.validate) !== 'function') {
        throw new Error(`${rule.name} is missing validate function`)
      }

      /**
       * Mutate args when `compile` function is defined. It is a way to
       * normalize arguments before the validation process kicks in.
       */
      if (typeof (validation.compile) === 'function') {
        rule.args = validation.compile(rule.args)
      }

      /**
       * Set the flag to `true` when one or more validations are `async`.
       * This tells the consumer of [[ValidationsRunner]] class to make
       * use of `execAsync` over `exec`. All done for performance.
       */
      if (validation.async) {
        this.async = true
      }

      return { rule: rule, fn: validation.validate, async: validation.async }
    })
  }

  /**
   * Returns a fresh data copy by copying some of the values from the actual
   * data and then mutating the `tip` and `pointer`. The tip and pointer
   * are mutated so that the validation function receives the closest
   * object from the pointer, resulting in performant code.
   */
  private getDataCopy (data: ValidationDataRoot): ValidationDataRoot {
    const tip = this.dotPath.length ? getValue(data.tip, this.dotPath) : data.tip

    /**
     * Prefix array pointer and current index, when this field is part
     * of an array.
     * Also do not append the pointer when pointer is `::tip::`
     */
    const pointer = data.arrayPointer ?
      (
        this.pointer === '::tip::'
          ? `${data.arrayPointer}.${data.currentIndex}`
          : `${data.arrayPointer}.${data.currentIndex}.${this.pointer}`
      )
      : this.pointer

    /**
     * Updating the tip and pointer
     */
    return Object.assign({}, data, {
      tip: this.field === '::tip::' ? { [this.field]: tip } : tip,
      pointer: pointer,
    })
  }

  /**
   * Reports value to the collector when current field is a literal
   * node inside the tree and validation has passed
   */
  private reportValueToCollector (
    passed: boolean,
    data: ValidationDataRoot,
    collector: CollectorContract,
  ): void {
    if (!passed || this.type !== 'literal') {
      return
    }

    collector.setValue(data.pointer, data.tip[this.field])
  }

  /**
   * Reports the validation error to the collector.
   */
  private reportErrorToCollector (
    pointer: string,
    rule: ParsedRule,
    collector: CollectorContract,
    exception: Error | null,
  ): void {
    const message = exception || this.fieldMessages[rule.name] || this.genericMessages[rule.name]
    collector.setError(pointer, rule, message)
  }

  /**
   * Executes all the validations on a given field synchronously. Run
   * [[ValidationsRunner.execAsync]] if want to execute asynchronously.
   */
  public exec (
    data: ValidationDataRoot,
    collector: CollectorContract,
    config: unknown,
    bail: boolean = false,
  ): boolean {
    const dataCopy = this.getDataCopy(data)

    /**
     * Skip validations when the parent value of this field is not
     * an object. The user must validate the parent to be object
     * seperately.
     */
    if (!(isObject as any)(dataCopy.tip)) {
      return true
    }

    let hasFailures = false

    /**
     * Sequentially loop over all the validations.
     * We break the loop, when `bail=true`.
     */
    for (let validation of this.validations) {
      let exception: Error | null = null
      let passed: boolean = true

      /**
       * Wrapping the validation function for unexpected errors.
       */
      try {
        passed = validation.fn(dataCopy, this.field, validation.rule.args, config) as boolean
      } catch (error) {
        exception = error
        passed = false
      }

      if (!passed) {
        hasFailures = true
        this.reportErrorToCollector(dataCopy.pointer, validation.rule, collector, exception)
        if (bail) {
          break
        }
      }
    }

    this.reportValueToCollector(!hasFailures, dataCopy, collector)
    return !hasFailures
  }

  /**
   * Executes all the validations on a given field asynchronously. Run
   * [[ValidationsRunner.exec]] if want to execute synchronously.
   */
  public async execAsync (
    data: ValidationDataRoot,
    collector: CollectorContract,
    config: unknown,
    bail: boolean = false,
  ): Promise<boolean> {
    const dataCopy = this.getDataCopy(data)

    /**
     * Skip validations when the parent value of this field is not
     * an object. The user must validate the parent to be object
     * seperately.
     */
    if (!(isObject as any)(dataCopy.tip)) {
      return true
    }

    let hasFailures = false

    /**
     * Sequentially loop over all the validations.
     * We break the loop, when `bail=true`.
     */
    for (let validation of this.validations) {
      let exception: Error | null = null
      let passed: boolean = true

      try {
        if (validation.async) {
          passed = await validation.fn(dataCopy, this.field, validation.rule.args, config)
        } else {
          passed = validation.fn(dataCopy, this.field, validation.rule.args, config) as boolean
        }
      } catch (error) {
        passed = false
        exception = error
      }

      if (!passed) {
        hasFailures = true
        this.reportErrorToCollector(dataCopy.pointer, validation.rule, collector, exception)

        if (bail) {
          break
        }
      }
    }

    this.reportValueToCollector(!hasFailures, dataCopy, collector)
    return !hasFailures
  }
}
