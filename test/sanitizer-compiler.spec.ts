/*
* indicative-compiler
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import test from 'japa'
import { join } from 'path'
import { Compiler } from '../src/Sanitizer/Compiler'

const fixtureModules = require('require-all')({
  dirname: join(__dirname, '../fixtures/sanitizer'),
  filter: /(.+)\.ts$/,
})

const fixtures = Object.keys(fixtureModules).reduce((result: any[], modPath) => {
  result.push({ module: fixtureModules[modPath], modPath })
  return result
}, [])

test.group('Sanitizations', () => {
  fixtures.forEach(({ module, modPath }) => {
    const { schema, data, sanitizations } = module.input()
    test(modPath, (assert) => {
      const fns = new Compiler(schema, sanitizations).compile()
      const root = { tip: data, original: data, pointer: '' }

      for (let fn of fns) {
        fn.exec(root, {})
      }

      module.assertions(assert, data)
    })
  })
})
