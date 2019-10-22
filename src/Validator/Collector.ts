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

import { pope } from 'pope'
import setValue from 'lodash.set'
import { ParsedRule, Message } from 'indicative-parser'
import { CollectorContract, ErrorFormatterContract } from '../contracts'

/**
 * Collector collects all the errors and creates a copy of validated
 * data (only when `generateTree = true`).
 */
export class Collector implements CollectorContract {
  public tree: any = {}
  public hasErrors: boolean = false

  constructor (public formatter: ErrorFormatterContract, private _generateTree: boolean) {
  }

  /**
   * Set value of a given node. The function results in a noop
   * when `value === undefined` or the validation chain has
   * one or more errors.
   */
  public setValue (pointer: string, value: any) {
    if (!this._generateTree || value === undefined || this.hasErrors) {
      return
    }

    pointer = pointer.replace('.::tip::', '')
    setValue(this.tree, pointer, value)
  }

  /**
   * Returns the collected data
   */
  public getData () {
    return this.tree
  }

  /**
   * Returns errors from the formatter
   */
  public getErrors (): any {
    return this.formatter.toJSON()
  }

  /**
   * Passes error to the error formatter for a given field and rule. Also when the
   * message is undefined, it will create a generic message.
   */
  public setError (pointer: string, rule: ParsedRule, message?: Message | Error) {
    this.hasErrors = true

    if (message && typeof (message) === 'string') {
      message = pope(message, {
        field: pointer,
        args: rule.args,
        validation: rule.name,
      })
    }

    message = message || `${rule.name} validation failed on ${pointer}`
    message = typeof (message) === 'function' ? message(pointer, rule.name, rule.args) : message

    /**
     * Report error to the formatter
     */
    this.formatter.addError(message, pointer, rule.name, rule.args)
  }
}
