/**
 * indicative-compiler
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import * as setValue from 'lodash.set'
import { ParsedRule, Message } from 'indicative-parser'
import { CollectorContract, ErrorFormatterContract } from './contracts'

/**
 * Collector collects all the errors and maintains a copy of validated
 * data.
 */
export class Collector implements CollectorContract {
  public tree: any = {}
  public hasErrors: boolean = false

  constructor (public formatter: ErrorFormatterContract) {
  }

  /**
   * Set value of a given node. The function results in a noop
   * when `value === undefined` or the validation chain has
   * one or more errors.
   */
  public setValue (pointer: string, value: any) {
    if (value === undefined || this.hasErrors) {
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
   * Consumes an error for a given data pointer and rule.
   */
  public setError (pointer: string, rule: ParsedRule, message?: Message) {
    this.hasErrors = true

    message = message || `${rule.name} validation failed on ${pointer}`
    message = typeof (message) === 'function' ? message(pointer, rule.name, rule.args) : message

    /**
     * Report error to the formatter
     */
    this.formatter.addError(pointer, message, rule)
  }
}
