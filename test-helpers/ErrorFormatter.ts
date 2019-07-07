/*
* indicative-compiler
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { ErrorFormatterContract } from '../src/contracts'

export class ErrorFormatter implements ErrorFormatterContract {
  private _errors: { field: string, message: string, validation: string }[] = []

  public addError (error: string | Error, field: string, rule: string) {
    const message = error instanceof Error ? error.message : error
    this._errors.push({ field, message, validation: rule })
  }

  public toJSON () {
    return this._errors
  }
}
