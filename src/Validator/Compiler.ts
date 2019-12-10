/**
 * @module compiler/validator
 */

/*
* indicative-compiler
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import {
  Schema,
  Messages,
  rulesParser,
  TypedSchema,
  ParsedSchema,
  ParsedMessages,
  messagesParser,
  ParsedTypedSchema,
} from 'indicative-parser'

import { TreeWalker } from '../TreeWalker'
import { ArrayWrapper } from './ArrayWrapper'
import { ValidationDefinition } from '../Contracts'
import { ValidationsRunner } from './ValidationsRunner'

/**
 * Compiles rules and messages schema to an array of top level
 * functions highly optimized for speed.
 */
export class Compiler {
  public parsedSchema: ParsedSchema
  public parsedMessages: ParsedMessages

  constructor (
    schema: Schema | ParsedTypedSchema<TypedSchema>,
    messages: Messages,
    private validations: { [key: string]: ValidationDefinition },
  ) {
    this.parsedSchema = rulesParser(schema)
    this.parsedMessages = messagesParser(messages)
  }

  /**
   * Compiles the schema to an array of functions
   */
  public compile (): (ValidationsRunner | ArrayWrapper)[] {
    return new TreeWalker<ValidationsRunner, ArrayWrapper>(
      /**
       * Consume each node inside the tree
       */
      (field, type, rules, dotPath, pointer) => {
        const messages = this.parsedMessages.fields[pointer] || {}
        const genericMessage = this.parsedMessages.rules
        return new ValidationsRunner(field, type, dotPath, rules, this.validations, messages, genericMessage)
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
