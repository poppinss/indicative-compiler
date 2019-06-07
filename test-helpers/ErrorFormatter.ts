/*
* indicative-compiler
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { ErrorFormatterContract } from '../src/contracts'
import { ParsedRule } from 'indicative-parser'

export class ErrorFormatter implements ErrorFormatterContract {
  private _errors: { field: string, message: string, validation: string }[] = []

  public addError (field: string, message: string, rule: ParsedRule) {
    this._errors.push({ field, message, validation: rule.name })
  }

  public toJSON () {
    return this._errors
  }
}
