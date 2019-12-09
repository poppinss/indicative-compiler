/**
 * @module compiler/sanitizer
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
import { ParsedRule } from 'indicative-parser'
import { SanitizationDefinition, SanitizeFunction, SanitizationDataRoot } from '../Contracts'

/**
 * Runs an array of sanitizations on a given field.
 */
export class SanitizationsRunner {
  private sanitizations: { rule: ParsedRule, fn: SanitizeFunction }[] = []

  constructor (
    private field: string,
    private dotPath: string[],
    rules: ParsedRule[],
    sanitizations: { [key: string]: SanitizationDefinition },
  ) {
    this.computeSanitizations(sanitizations, rules)
  }

  /**
   * Pull sanitizations for the list defined rules.
   */
  private computeSanitizations (
    sanitizations: { [key: string]: SanitizationDefinition },
    rules: ParsedRule[],
  ): void {
    this.sanitizations = rules.map((rule) => {
      const sanitization = sanitizations[rule.name]

      /**
       * Raise exception when sanitization implementation for a
       * given rule is missing.
       */
      if (!sanitization) {
        throw new Error(`${rule.name} is not a registered as a sanitization`)
      }

      /**
       * The sanitization node must have a `validate` function.
       */
      if (typeof (sanitization.sanitize) !== 'function') {
        throw new Error(`${rule.name} is missing sanitize function`)
      }

      /**
       * Mutate args when `compile` function is defined. It is a way to
       * normalize arguments before the sanitization process kicks in.
       */
      if (typeof (sanitization.compile) === 'function') {
        rule.args = sanitization.compile(rule.args)
      }

      return { rule: rule, fn: sanitization.sanitize }
    })
  }

  /**
   * Returns a fresh data copy by copying some of the values from the actual
   * data and then mutating the `tip` and `pointer`. The tip and pointer
   * are mutated so that the sanitization function receives the closest
   * object from the pointer, resulting in performant code.
   */
  private getDataCopy (data: SanitizationDataRoot): SanitizationDataRoot {
    const tip = this.dotPath.length ? getValue(data.tip, this.dotPath) : data.tip

    /**
     * Updating the tip and pointer
     */
    return Object.assign({}, data, {
      tip: this.field === '::tip::' ? { [this.field]: tip } : tip,
    })
  }

  /**
   * Execute all sanitization in series for a given filed
   */
  public exec (data: SanitizationDataRoot, config: unknown): void {
    const dataCopy = this.getDataCopy(data)

    /**
     * Skip validations when the parent value of this field is not
     * an object. The user must validate the parent to be object
     * seperately.
     */
    if (!(isObject as any)(dataCopy.tip)) {
      return
    }

    this.sanitizations.forEach((sanitization) => {
      sanitization.fn(dataCopy, this.field, sanitization.rule.args, config)
    })
  }
}
