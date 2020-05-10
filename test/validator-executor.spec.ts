/**
 * indicative-compiler
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import test from 'japa'
import { t } from 'indicative-parser'
import { Executor } from '../src/Validator/Executor'
import { Compiler } from '../src/Validator/Compiler'
import { ErrorFormatter } from '../test-helpers/ErrorFormatter'

test.group('Executor', () => {
  test('return errors when validations fail', async (assert) => {
    assert.plan(1)

    const schema = {
      username: 'required',
      age: 'required',
    }

    const validations = {
      required: {
        async: false,
        validate (): boolean {
          return false
        },
      },
    }

    const compiler = new Compiler(schema, {}, validations)
    const executor = new Executor(compiler.compile())

    try {
      await executor.exec({}, ErrorFormatter, {}, false, false)
    } catch (errors) {
      assert.deepEqual(errors, [
        {
          field: 'username',
          message: 'required validation failed on username',
          validation: 'required',
        },
        {
          field: 'age',
          message: 'required validation failed on age',
          validation: 'required',
        },
      ])
    }
  })

  test('stop at first error when bail=true', async (assert) => {
    assert.plan(1)

    const schema = {
      username: 'required',
      age: 'required',
    }

    const validations = {
      required: {
        async: false,
        validate (): boolean {
          return false
        },
      },
    }

    const compiler = new Compiler(schema, {}, validations)
    const executor = new Executor(compiler.compile())

    try {
      await executor.exec({}, ErrorFormatter, {}, true, false)
    } catch (errors) {
      assert.deepEqual(errors, [
        {
          field: 'username',
          message: 'required validation failed on username',
          validation: 'required',
        },
      ])
    }
  })

  test('stop at first validation when bail=true', async (assert) => {
    assert.plan(1)

    const schema = {
      username: 'required|alpha',
      age: 'required',
    }

    const validations = {
      required: {
        async: false,
        validate (): boolean {
          return false
        },
      },
      alpha: {
        async: false,
        validate (): boolean {
          throw new Error('Not expected to be called')
        },
      },
    }

    const compiler = new Compiler(schema, {}, validations)
    const executor = new Executor(compiler.compile())

    try {
      await executor.exec({}, ErrorFormatter, {}, true, false)
    } catch (errors) {
      assert.deepEqual(errors, [
        {
          field: 'username',
          message: 'required validation failed on username',
          validation: 'required',
        },
      ])
    }
  })

  test('return new copy of validated data', async (assert) => {
    assert.plan(1)

    const schema = {
      username: 'required',
    }

    const validations = {
      required: {
        async: false,
        validate (): boolean {
          return true
        },
      },
    }

    const data = {
      username: 'virk',
      age: 22,
    }

    const compiler = new Compiler(schema, {}, validations)
    const executor = new Executor(compiler.compile())
    const freshData = await executor.exec(data, ErrorFormatter, {}, false, true)
    assert.deepEqual(freshData, { username: 'virk' })
  })

  test('return old data when removeAdditional is false', async (assert) => {
    assert.plan(1)

    const schema = {
      username: 'required',
    }

    const validations = {
      required: {
        async: false,
        validate (): boolean {
          return true
        },
      },
    }

    const data = {
      username: 'virk',
      age: 22,
    }

    const compiler = new Compiler(schema, {}, validations)
    const executor = new Executor(compiler.compile())
    const freshData = await executor.exec(data, ErrorFormatter, {}, false, false)
    assert.deepEqual(freshData, { username: 'virk', age: 22 })
  })

  test('return errors when partial validations fails with bail=false', async (assert) => {
    assert.plan(1)

    const schema = {
      username: 'required',
      age: 'min',
    }

    const validations = {
      required: {
        async: false,
        validate (): boolean {
          return false
        },
      },
      min: {
        async: false,
        validate (): boolean {
          return true
        },
      },
    }

    const compiler = new Compiler(schema, {}, validations)
    const executor = new Executor(compiler.compile())

    try {
      await executor.exec({}, ErrorFormatter, {}, false, false)
    } catch (errors) {
      assert.deepEqual(errors, [
        {
          field: 'username',
          message: 'required validation failed on username',
          validation: 'required',
        },
      ])
    }
  })

  test(`
  return errors (only first failure) when a validation fails
  on a field with bail=false and bailOnEachField=true`, async (assert) => {
    assert.plan(1)

    const schema = {
      email: 'required|email|ends_with:.com',
      age: 'required|number|above:4',
    }

    const validations = {
      required: {
        async: false,
        validate (): boolean {
          return true
        },
      },
      email: {
        async: false,
        validate (): boolean {
          return false
        },
      },
      endsWith: {
        async: false,
        validate (): boolean {
          return false
        },
      },
      number: {
        async: false,
        validate (): boolean {
          return false
        },
      },
      above: {
        async: false,
        validate (): boolean {
          return false
        },
      },
    }

    const compiler = new Compiler(schema, {}, validations)
    const executor = new Executor(compiler.compile())

    try {
      await executor.exec({}, ErrorFormatter, {}, false, false, undefined, true)
    } catch (errors) {
      assert.deepEqual(errors, [
        {
          field: 'email',
          message: 'email validation failed on email',
          validation: 'email',
        },
        {
          field: 'age',
          message: 'number validation failed on age',
          validation: 'number',
        },
      ])
    }
  })

  test('invoke custom error collector when defined', async (assert) => {
    assert.plan(1)

    const schema = {
      username: 'required',
      age: 'required',
    }

    const validations = {
      required: {
        async: false,
        validate (): boolean {
          return false
        },
      },
    }

    const compiler = new Compiler(schema, {}, validations)
    const executor = new Executor(compiler.compile())

    try {
      await executor.exec({}, ErrorFormatter, {}, false, false, (formatter, _m, field, rule, args) => {
        formatter.addError('Validation failure', field, rule, args)
      })
    } catch (errors) {
      assert.deepEqual(errors, [
        {
          field: 'username',
          message: 'Validation failure',
          validation: 'required',
        },
        {
          field: 'age',
          message: 'Validation failure',
          validation: 'required',
        },
      ])
    }
  })

  test('validate using pre-parsed schema', async (assert) => {
    assert.plan(1)

    const schema = t.schema({
      username: t.string(),
      age: t.number(),
    })

    const validations = {
      required: {
        async: false,
        validate (): boolean {
          return false
        },
      },
      string: {
        async: false,
        validate (): boolean {
          return false
        },
      },
      number: {
        async: false,
        validate (): boolean {
          return false
        },
      },
    }

    const compiler = new Compiler(schema, {}, validations)
    const executor = new Executor(compiler.compile())

    try {
      await executor.exec({}, ErrorFormatter, {}, false, false)
    } catch (errors) {
      assert.deepEqual(errors, [
        {
          field: 'username',
          message: 'required validation failed on username',
          validation: 'required',
        },
        {
          field: 'username',
          message: 'string validation failed on username',
          validation: 'string',
        },
        {
          field: 'age',
          message: 'required validation failed on age',
          validation: 'required',
        },
        {
          field: 'age',
          message: 'number validation failed on age',
          validation: 'number',
        },
      ])
    }
  })
})
