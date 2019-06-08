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
  rulesParser,
  messagesParser,
  Messages,
  ParsedSchema,
  ParsedMessages,
} from 'indicative-parser'

import { TreeWalker } from './TreeWalker'
import { ArrayWrapper } from './ArrayWrapper'
import { ValidationDefination } from './contracts'
import { ValidationsRunner } from './ValidationsRunner'

/**
 * Compiles rules and messages schema to an array of top level
 * functions highly optimized for speed.
 */
export class Compiler {
  private _parsedSchema: ParsedSchema
  private _parsedMessages: ParsedMessages

  constructor (
    schema: Schema,
    messages: Messages,
    private _validations: { [key: string]: ValidationDefination },
  ) {
    this._parsedSchema = rulesParser(schema)
    this._parsedMessages = messagesParser(messages)
  }

  /**
   * Compiles the schema to an array of functions
   */
  public compile () {
    return new TreeWalker<ValidationsRunner, ArrayWrapper>(
      /**
       * Consume each node inside the tree
       */
      (field, type, rules, dotPath, pointer) => {
        const messages = this._parsedMessages.fields[pointer] || {}
        const genericMessage = this._parsedMessages.rules
        return new ValidationsRunner(field, type, dotPath, rules, this._validations, messages, genericMessage)
      },

      /**
       * Wraps array children, since the length of array is unknown.
       */
      (index, field, children, dotPath) => {
        return new ArrayWrapper(field, index, children, dotPath)
      },
    ).walk(this._parsedSchema)
  }
}
