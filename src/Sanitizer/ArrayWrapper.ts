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

import getValue from 'lodash.get'
import { SanitizationDataRoot } from '../Contracts'
import { SanitizationsRunner } from './SanitizationsRunner'

/**
 * Wraps an array of [[SanitizationsRunner]] and executes
 * them based upon the length of an data array at runtime.
 */
export class ArrayWrapper {
  /**
   * The pointer to read the value of the field inside the data tip
   */
  private pointer: string = this.dotPath.concat(this.field).join('.')

  constructor (
    private field: string,
    private index: string,
    private childSanitizations: (SanitizationsRunner | ArrayWrapper)[],
    private dotPath: string[],
  ) {}

  /**
   * Returns data copy to the passed to all the children of the array.
   */
  private getDataCopy (data: SanitizationDataRoot): null | SanitizationDataRoot {
    const value = getValue(data.tip, this.pointer)

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
      currentIndex: this.index === '*' ? 0 : Number(this.index),
    }
  }

  /**
   * Executes all sanitizations for a given index value inside the array.
   */
  private executeSanitizations (data: SanitizationDataRoot, config: unknown): void {
    this.childSanitizations.forEach((sanitization) => sanitization.exec(data, config))
  }

  /**
   * Execute series of sanitizations for values inside an array
   */
  public exec (data: SanitizationDataRoot, config: unknown): void {
    const dataCopy = this.getDataCopy(data)
    if (!dataCopy) {
      return
    }

    /**
     * If index is a not a wildcard, then we run validations
     * just for the given index.
     */
    if (this.index !== '*') {
      dataCopy.tip = dataCopy.parentArray![dataCopy.currentIndex!]
      return this.executeSanitizations(dataCopy, config)
    }

    /**
     * Loop over all the entire array and execute validations
     * for each field.
     */
    dataCopy.parentArray!.forEach((item, index) => {
      dataCopy.tip = item
      dataCopy.currentIndex = index
      this.executeSanitizations(dataCopy, config)
    })
  }
}
