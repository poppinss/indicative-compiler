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

import getValue from 'lodash.get'

import { ValidationsRunner } from './ValidationsRunner'
import { ValidationDataRoot, CollectorContract } from '../Contracts'

/**
 * Wraps the [[ValidationsRunner]] and executes them based upon the length of
 * an array at runtime.
 */
export class ArrayWrapper {
  /**
   * The pointer to read the value of the field inside the data tip
   */
  private pointer: string = this.dotPath.concat(this.field).join('.')

  /**
   * A boolean to know if any of the children inside the wrapper
   * has async validators.
   */
  public async: boolean = !!this.childrenValidators.find((validator) => validator.async)

  constructor (
    private field: string,
    private index: string,
    private childrenValidators: (ValidationsRunner | ArrayWrapper)[],
    private dotPath: string[],
  ) {
  }

  /**
   * Returns data copy to the passed to all the children of the
   * array.
   */
  private getDataCopy (data: ValidationDataRoot): null | ValidationDataRoot {
    const value = getValue(data.tip, this.pointer)

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
      currentIndex: this.index === '*' ? 0 : Number(this.index),
      arrayPointer: data.arrayPointer
        ? `${data.arrayPointer}.${data.currentIndex}.${this.pointer}`
        : this.pointer,
    }
  }

  /**
   * Executes all validations for a given index value inside the array.
   */
  private executeValidations (
    data: ValidationDataRoot,
    collector: CollectorContract,
    config: unknown,
    bail: boolean,
    bailOnEachField?: boolean
  ): boolean {
    let hasFailures = false

    for (let validator of this.childrenValidators) {
      const passed = validator.exec(data, collector, config, bail, bailOnEachField)
      if (!passed) {
        hasFailures = true
        if (bail) {
          break
        }
      }
    }

    return !hasFailures
  }

  /**
   * Same as [[ArrayWrapper.executeValidations]] but async.
   */
  private async executeAsyncValidations (
    data: ValidationDataRoot,
    collector: CollectorContract,
    config: unknown,
    bail: boolean,
    bailOnEachField?: boolean
  ): Promise<boolean> {
    let hasFailures = false

    for (let validator of this.childrenValidators) {
      let passed = true

      if (validator.async) {
        passed = await validator.execAsync(data, collector, config, bail, bailOnEachField)
      } else {
        passed = validator.exec(data, collector, config, bail, bailOnEachField)
      }

      if (!passed) {
        hasFailures = true
        if (bail && !bailOnEachField) {
          break
        }
      }
    }

    return !hasFailures
  }

  /**
   * Execute series of validations for values inside an array
   */
  public exec (
    data: ValidationDataRoot,
    collector: CollectorContract,
    config: unknown,
    bail: boolean = false,
    bailOnEachField: boolean = false
  ): boolean {
    const dataCopy = this.getDataCopy(data)
    if (!dataCopy) {
      return true
    }

    /**
     * If index is a not a wildcard, then we run validations
     * just for the given index.
     */
    if (this.index !== '*') {
      dataCopy.tip = dataCopy.parentArray![dataCopy.currentIndex!]
      return this.executeValidations(dataCopy, collector, config, bail, bailOnEachField)
    }

    let index = 0
    let hasFailures = false

    /**
     * Loop over all the entire array and execute validations
     * for each field.
     */
    for (let item of dataCopy.parentArray!) {
      dataCopy.tip = item
      dataCopy.currentIndex = index
      let passed = true

      passed = this.executeValidations(dataCopy, collector, config, bail, bailOnEachField)
      if (!passed) {
        hasFailures = true
        if (bail || bailOnEachField) {
          break
        }
      }

      index++
    }

    return !hasFailures
  }

  /**
   * Execute series of async validations for values inside an array. Same
   * as [[ArrayWrapper.exec]] but async.
   */
  public async execAsync (
    data: ValidationDataRoot,
    collector: CollectorContract,
    config: unknown,
    bail: boolean = false,
    bailOnEachField: boolean = false,
  ): Promise<boolean> {
    const dataCopy = this.getDataCopy(data)
    if (!dataCopy) {
      return true
    }

    /**
     * If index is a not a wildcard, then we run validations
     * just for the given index.
     */
    if (this.index !== '*') {
      dataCopy.tip = dataCopy.parentArray![dataCopy.currentIndex!]
      return this.executeAsyncValidations(dataCopy, collector, config, bail, bailOnEachField)
    }

    let index = 0
    let hasFailures = false

    /**
     * Loop over all the entire array and execute validations
     * for each field.
     */
    for (let item of dataCopy.parentArray!) {
      dataCopy.tip = item
      dataCopy.currentIndex = index

      const passed = await this.executeAsyncValidations(dataCopy, collector, config, bail, bailOnEachField)
      if (!passed) {
        hasFailures = true
        if (bail || bailOnEachField) {
          break
        }
      }
      index++
    }

    return !hasFailures
  }
}
