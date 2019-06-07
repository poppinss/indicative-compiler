/**
 * indicative-compiler
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import * as getValue from 'get-value'

import { Collector } from './Collector'
import { ValidationDataRoot } from './contracts'
import { ValidationsRunner } from './ValidationsRunner'

export class ArrayWrapper {
  /**
   * The pointer to read the value of the field inside the data tip
   */
  private _pointer: string = this._dotPath.concat(this._field).join('.')

  /**
   * A boolean to know if any of the children inside the wrapper
   * has async validators.
   */
  public async: boolean = !!this._childValidators.find((validator) => validator.async)

  constructor (
    private _field: string,
    private _index: string,
    private _childValidators: (ValidationsRunner | ArrayWrapper)[],
    private _dotPath: string[],
  ) {}

  /**
   * Returns data copy to the passed to all the children of the
   * array.
   */
  private _getDataCopy (data: ValidationDataRoot): null | ValidationDataRoot {
    const value = getValue(data.tip, this._pointer)

    /**
     * Ensure value is array, otherwise mark the validation as passed.
     * The top level value must be validated for an array for same.
     */
    if (!Array.isArray(value)) {
      return null
    }

    /**
     * Since we are adding new properties to the data object. We have
     * to create a new copy, otherwise the array specific values
     * will leak this info to other validations as well.
     */
    return {
      original: data.original,
      pointer: '',
      tip: null,
      parentArray: value,
      currentIndex: this._index === '*' ? 0 : Number(this._index),
      arrayPointer: data.arrayPointer
        ? `${data.arrayPointer}.${data.currentIndex}.${this._pointer}`
        : this._pointer,
    }
  }

  /**
   * Executes all validations for a given index value inside the array.
   */
  private _executeValidations (data: ValidationDataRoot, collector: Collector, bail: boolean) {
    let passed: boolean = true

    for (let validator of this._childValidators) {
      passed = validator.exec(data, collector, bail)
      if (bail && !passed) {
        break
      }
    }

    return passed
  }

  /**
   * Same as [[ArrayWrapper._executeValidations]] but async.
   */
  private async _executeAsyncValidations (data: ValidationDataRoot, collector: Collector, bail: boolean) {
    let passed: boolean = true

    for (let validator of this._childValidators) {
      if (validator.async) {
        passed = await validator.execAsync(data, collector, bail)
      } else {
        passed = validator.exec(data, collector, bail)
      }

      if (bail && !passed) {
        break
      }
    }

    return passed
  }

  /**
   * Execute series of validations for values inside an array
   */
  public exec (data: ValidationDataRoot, collector: Collector, bail: boolean = false): boolean {
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
      return this._executeValidations(dataCopy, collector, bail)
    }

    let passed: boolean = true
    let index = 0

    /**
     * Loop over all the entire array and execute validations
     * for each field.
     */
    for (let item of dataCopy.parentArray!) {
      dataCopy.tip = item
      dataCopy.currentIndex = index

      passed = this._executeValidations(dataCopy, collector, bail)
      if (bail && !passed) {
        break
      }
      index++
    }

    return passed
  }

  /**
   * Execute series of async validations for values inside an array. Same
   * as [[ArrayWrapper.exec]] but async.
   */
  public async execAsync (
    data: ValidationDataRoot,
    collector: Collector,
    bail: boolean = false,
  ): Promise<boolean> {
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
      return this._executeAsyncValidations(dataCopy, collector, bail)
    }

    let passed: boolean = true
    let index = 0

    /**
     * Loop over all the entire array and execute validations
     * for each field.
     */
    for (let item of dataCopy.parentArray!) {
      dataCopy.tip = item
      dataCopy.currentIndex = index

      passed = await this._executeAsyncValidations(dataCopy, collector, bail)
      if (bail && !passed) {
        break
      }
      index++
    }

    return passed
  }
}
