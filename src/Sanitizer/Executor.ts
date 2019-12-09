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

import { ArrayWrapper } from './ArrayWrapper'
import { SanitizationsRunner } from './SanitizationsRunner'

/**
 * Executor is meant to execute the compiled functions with runtime
 * data.
 */
export class Executor {
  constructor (private fns: (ArrayWrapper | SanitizationsRunner)[]) {
  }

  /**
   * Executes the compiled functions in sequence.
   */
  public exec (data: any, config: unknown): any {
    /**
     * Creating a root data node. The `tip` and `pointer` will be copied
     * and mutated down the road
     */
    const root = { tip: data, original: data }
    this.fns.forEach((fn) => fn.exec(root, config))

    return data
  }
}
