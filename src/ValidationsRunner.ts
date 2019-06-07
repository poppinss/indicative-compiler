/**
 * indicative-compiler
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { ParsedRule, ParsedRulesMessages } from 'indicative-parser'
import * as getValue from 'get-value'
import * as isObject from 'isobject'
import { Collector } from './Collector'

import {
  ValidationDataRoot,
  ValidateFunction,
  ValidationDefination,
} from './contracts'

/**
 * Validations runner to run a series on validations on a given field
 * based upon the defined rules.
 */
export class ValidationsRunner {
  /**
   * We toggle this flag then creating the `_validations` object
   */
  public async = false

  /**
   * Collection of validations to be executed on a given field.
   */
  private _validations: {
    async: boolean,
    rule: ParsedRule,
    fn: ValidateFunction,
  }[] = []

  /**
   * Base pointer to this field. When field is inside an
   * array, then we need to re-compute the pointer
   * based upon the current index in which this
   * field is validated.
   *
   * However, we don't mutate this field.
   */
  private _pointer = this._dotPath.concat(this._field).join('.')

  constructor (
    private _field: string,
    private _type: 'literal' | 'object' | 'array',
    private _dotPath: string[],
    rules: ParsedRule[],
    validations: { [key: string]: ValidationDefination },
    private _fieldMessages: ParsedRulesMessages,
    private _genericMessages: ParsedRulesMessages,
  ) {
    this._pullValidationFunctions(validations, rules)
  }

  /**
   * Creating a list of validation functions to be executed as per
   * the defined rules.
   */
  private _pullValidationFunctions (
    validations: { [key: string]: ValidationDefination },
    rules: ParsedRule[],
  ) {
    this._validations = rules.map((rule) => {
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
       * Set the flag to `true` when one or more validations are `async`. This tells
       * the consumer of [[ValidationsRunner]] class to make use of `execAsync` over
       * `exec`. All done for performance.
       */
      if (validation.async) {
        this.async = true
      }

      return { rule: rule, fn: validation.validate, async: validation.async }
    })
  }

  /**
   * Mutates the `data.tip` property to be the nearest object from the field
   * under validation. Since, the validations are sequential, we can safely
   * mutate this field without side-effects.
   */
  private _getDataNode (data: ValidationDataRoot): ValidationDataRoot {
    const tip = this._dotPath.length ? getValue(data.tip, this._dotPath) : data.tip

    const pointer = data.arrayPointer ?
      `${data.arrayPointer}.${data.currentIndex}.${this._pointer}`
      : this._pointer

    return {
      tip: this._field === '::tip::' ? { [this._field]: tip } : tip,
      original: data.original,
      pointer: pointer,
      parentArray: data.parentArray,
      currentIndex: data.currentIndex,
      arrayPointer: data.arrayPointer,
    }
  }

  /**
   * Reports value to the collector when current field is a literal
   * node inside the tree and validation has passed
   */
  private _reportValueToCollector (
    passed: boolean,
    data: ValidationDataRoot,
    collector: Collector,
  ) {
    if (!passed || this._type !== 'literal') {
      return
    }

    collector.setValue(data.pointer, data.tip[this._field])
  }

  /**
   * Reports the validation error to the collector.
   */
  private _reportErrorToCollector (
    pointer: string,
    rule: ParsedRule,
    collector: Collector,
  ) {
    const message = this._fieldMessages[rule.name] || this._genericMessages[rule.name]
    collector.setError(pointer, rule, message)
  }

  /**
   * Executes all the validations on a given field synchronously. Run
   * [[ValidationsRunner.execAsync]] if want to execute asynchronously.
   */
  public exec (
    data: ValidationDataRoot,
    collector: Collector,
    bail: boolean = false,
  ): boolean {
    const dataCopy = this._getDataNode(data)

    /**
     * Skip validations when the parent value of this field is not
     * an object. The user must validate the parent to be object
     * seperately.
     */
    if (!(isObject as any)(dataCopy.tip)) {
      return true
    }

    let passed: boolean = true

    /**
     * Sequentially loop over all the validations. We break the loop, when `bail=true`.
     */
    for (let validation of this._validations) {
      passed = validation.fn(dataCopy, this._field, validation.rule.args) as boolean

      if (!passed) {
        this._reportErrorToCollector(dataCopy.pointer, validation.rule, collector)
        if (bail) {
          break
        }
      }
    }

    this._reportValueToCollector(passed, dataCopy, collector)
    return passed
  }

  /**
   * Executes all the validations on a given field asynchronously. Run
   * [[ValidationsRunner.exec]] if want to execute synchronously.
   */
  public async execAsync (
    data: ValidationDataRoot,
    collector: Collector,
    bail: boolean = false,
  ): Promise<boolean> {
    const dataCopy = this._getDataNode(data)

    /**
     * Skip validations when the parent value of this field is not
     * an object. The user must validate the parent to be object
     * seperately.
     */
    if (!(isObject as any)(dataCopy.tip)) {
      return true
    }

    let passed: boolean = true

    /**
     * Sequentially loop over all the validations. We break the loop, when `bail=true`.
     */
    for (let validation of this._validations) {
      if (validation.async) {
        passed = await validation.fn(dataCopy, this._field, validation.rule.args)
      } else {
        passed = validation.fn(dataCopy, this._field, validation.rule.args) as boolean
      }

      if (!passed) {
        this._reportErrorToCollector(dataCopy.pointer, validation.rule, collector)
        if (bail) {
          break
        }
      }
    }

    this._reportValueToCollector(passed, dataCopy, collector)
    return passed
  }
}
