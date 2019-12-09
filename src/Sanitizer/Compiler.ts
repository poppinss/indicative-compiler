/**
 * @module compiler/sanitizer
 */

/*
* indicative-compiler
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { Schema, rulesParser, ParsedSchema } from 'indicative-parser'

import { TreeWalker } from '../TreeWalker'
import { ArrayWrapper } from './ArrayWrapper'
import { SanitizationDefination } from '../Contracts'
import { SanitizationsRunner } from './SanitizationsRunner'

/**
 * Compiles rules and messages schema to an array of top level
 * functions highly optimized for speed.
 */
export class Compiler {
  private parsedSchema: ParsedSchema

  constructor (
    schema: Schema,
    private sanitizations: { [key: string]: SanitizationDefination },
  ) {
    this.parsedSchema = rulesParser(schema)
  }

  /**
   * Compiles the schema to an array of functions
   */
  public compile (): (SanitizationsRunner | ArrayWrapper)[] {
    return new TreeWalker<SanitizationsRunner, ArrayWrapper>(
      /**
       * Consume each node inside the tree
       */
      (field, _, rules, dotPath) => {
        return new SanitizationsRunner(field, dotPath, rules, this.sanitizations)
      },

      /**
       * Wraps array children, since the length of array is unknown.
       */
      (index, field, children, dotPath) => {
        return new ArrayWrapper(field, index, children, dotPath)
      },
    ).walk(this.parsedSchema)
  }
}
