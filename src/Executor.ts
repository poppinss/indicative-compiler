/**
 * indicative-compiler
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { ErrorFormatterContract } from './contracts'
import { Collector } from './Collector'
import { ValidationsRunner } from './ValidationsRunner'
import { ArrayWrapper } from './ArrayWrapper'

/**
 * Executor is meant to execute the compiled functions with runtime
 * data.
 */
export class Executor {
  constructor (private _fns: (ArrayWrapper & ValidationsRunner)[]) {
  }

  /**
   * Executes the compiled functions in sequence.
   */
  public async exec (
    data: any,
    Formatter: { new (): ErrorFormatterContract },
    bail: boolean,
    removeAdditional: boolean,
  ) {
    const root = { tip: data, original: data, pointer: '' }
    const collector = new Collector(new Formatter(), removeAdditional)
    let passed: boolean = true

    for (let fn of this._fns) {
      if (fn.async) {
        passed = await fn.execAsync(root, collector, bail)
      } else {
        passed = fn.exec(root, collector, bail)
      }

      if (!passed && bail) {
        break
      }
    }

    if (passed) {
      return collector.getData()
    }

    throw collector.getErrors()
  }
}
