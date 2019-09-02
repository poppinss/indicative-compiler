/**
 * indicative-compiler
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import test from 'japa'
import { Executor } from '../src/Sanitizer/Executor'
import { Compiler } from '../src/Sanitizer/Compiler'
import { patchValue, getValue } from 'indicative-utils'

test.group('Sanitizer Executor', () => {
  test('run sanitizations and mutate data', async (assert) => {
    assert.plan(1)

    const schema = {
      username: 'escape',
      age: 'escape',
    }

    const sanitizations = {
      escape: {
        sanitize (data, field) {
          patchValue(data, field, `${getValue(data, field)}-escaped`)
        },
      },
    }

    const compiler = new Compiler(schema, sanitizations)
    const executor = new Executor(compiler.compile())
    const data = {
      username: 'virk',
      age: '22',
    }

    executor.exec(data, {})
    assert.deepEqual(data, {
      username: 'virk-escaped',
      age: '22-escaped',
    })
  })
})
