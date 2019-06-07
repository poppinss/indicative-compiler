/*
* indicative-compiler
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import * as test from 'japa'
import { join } from 'path'
import { Compiler } from '../src/Compiler'
import { Collector } from '../src/Collector'
import { ErrorFormatter } from '../test-helpers/ErrorFormatter'
import * as cloneDeep from 'clone-deep'

const fixtureModules = require('require-all')({
  dirname: join(__dirname, '../fixtures'),
  filter: /(.+)\.ts$/,
})
const fixtures = Object.keys(fixtureModules).reduce((result: any[], modPath) => {
  result.push({ module: fixtureModules[modPath], modPath })
  return result
}, [])

test.group('Validations (sync)', () => {
  fixtures.forEach(({ module, modPath }) => {
    const { schema, data, messages, validations, casts } = module.input()
    test(modPath, (assert) => {
      const fns = new Compiler(schema, messages, validations).compile()

      /**
       * Running validation synchronously
       */
      const collector = new Collector(new ErrorFormatter())
      const originalData = cloneDeep(data)
      const root = { tip: data, original: data, pointer: '' }

      for (let fn of fns) {
        fn.exec(root, collector)
      }

      module.assertions(assert, collector.getData(), collector.getErrors())

      if (!casts) {
        assert.deepEqual(root, { tip: originalData, original: originalData, pointer: '' })
      }
    })
  })
})

test.group('Validations (async)', () => {
  fixtures.forEach(({ module, modPath }) => {
    const { schema, data, messages, validations, casts } = module.input()
    test(modPath, async (assert) => {
      const asyncValidations = Object.keys(validations).reduce((result, rule) => {
        result[rule] = Object.assign({}, validations[rule], { async: true })
        return result
      }, {})

      const fns = new Compiler(schema, messages, asyncValidations).compile()

      /**
       * Running validation synchronously
       */
      const collector = new Collector(new ErrorFormatter())
      const originalData = cloneDeep(data)
      const root = { tip: data, original: data, pointer: '' }

      for (let fn of fns) {
        await fn.execAsync(root, collector)
      }

      module.assertions(assert, collector.getData(), collector.getErrors())

      if (!casts) {
        assert.deepEqual(root, { tip: originalData, original: originalData, pointer: '' })
      }
    })
  })
})
