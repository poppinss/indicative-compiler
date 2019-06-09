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

import * as getValue from 'lodash.get'
import { SanitizationDataRoot } from '../contracts'
import { SanitizationsRunner } from './SanitizationsRunner'

/**
 * Wraps an array of [[SanitizationsRunner]] and executes
 * them based upon the length of an data array at runtime.
 */
export class ArrayWrapper {
  /**
   * The pointer to read the value of the field inside the data tip
   */
  private _pointer: string = this._dotPath.concat(this._field).join('.')

  constructor (
    private _field: string,
    private _index: string,
    private _childSanitizations: (SanitizationsRunner | ArrayWrapper)[],
    private _dotPath: string[],
  ) {}

  /**
   * Returns data copy to the passed to all the children of the array.
   */
  private _getDataCopy (data: SanitizationDataRoot): null | SanitizationDataRoot {
    const value = getValue(data.tip, this._pointer)

    /**
     * Ensure value is array, otherwise skip the sanitization process.
     */
    if (!Array.isArray(value)) {
      return null
    }

    /**
     * Since we are adding new properties to the data object. We have
     * to create a new copy, otherwise the array specific values
     * will leak this info to other sanitizations as well.
     */
    return {
      original: data.original,
      tip: null,
      parentArray: value,
      currentIndex: this._index === '*' ? 0 : Number(this._index),
    }
  }

  /**
   * Executes all sanitizations for a given index value inside the array.
   */
  private _executeSanitizations (data: SanitizationDataRoot, config: unknown) {
    this._childSanitizations.forEach((sanitization) => sanitization.exec(data, config))
  }

  /**
   * Execute series of validations for values inside an array
   */
  public exec (data: SanitizationDataRoot, config: unknown) {
    const dataCopy = this._getDataCopy(data)
    if (!dataCopy) {
      return true
    }

    /**
     * If index is a not a wildcard, then we run validations
     * just for the given index.
     */
    if (this._index !== '*') {
      dataCopy.tip = dataCopy.parentArray![dataCopy.currentIndex!]
      return this._executeSanitizations(dataCopy, config)
    }

    /**
     * Loop over all the entire array and execute validations
     * for each field.
     */
    dataCopy.parentArray!.forEach((item, index) => {
      dataCopy.tip = item
      dataCopy.currentIndex = index
      this._executeSanitizations(dataCopy, config)
    })
  }
}
