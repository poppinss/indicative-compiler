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

import { Collector } from './Collector'
import { ArrayWrapper } from './ArrayWrapper'
import { ValidationsRunner } from './ValidationsRunner'
import { ErrorFormatterContract } from '../contracts'

/**
 * Executor is meant to execute the compiled functions with runtime
 * data.
 */
export class Executor {
  constructor (private _fns: (ArrayWrapper | ValidationsRunner)[]) {
  }

  /**
   * Executes the compiled functions in sequence.
   */
  public async exec (
    data: any,
    Formatter: { new (): ErrorFormatterContract },
    config: unknown,
    bail: boolean,
    removeAdditional: boolean,
  ) {
    /**
     * Creating a root data node. The `tip` and `pointer` will be copied
     * and mutated down the road
     */
    const root = { tip: data, original: data, pointer: '' }

    /**
     * Collector to collect errors and a fresh data object with only
     * validated data (relies on removeAdditional though)
     */
    const collector = new Collector(new Formatter(), removeAdditional)

    for (let fn of this._fns) {
      let passed: boolean = false

      if (fn.async) {
        passed = await fn.execAsync(root, collector, config, bail)
      } else {
        passed = fn.exec(root, collector, config, bail)
      }

      if (!passed && bail) {
        break
      }
    }

    const errors = collector.getErrors()

    /**
     * If passed, return the data
     */
    if (!errors) {
      return removeAdditional ? collector.getData() : data
    }

    /**
     * Otherwise return errors
     */
    throw errors
  }
}
