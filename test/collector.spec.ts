/**
 * indicative-compiler
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import * as test from 'japa'
import { Collector } from '../src/Validator/Collector'
import { ErrorFormatter } from '../test-helpers/ErrorFormatter'

test.group('Collector', () => {
  test('collect values for a data pointer', (assert) => {
    const formatter = new ErrorFormatter()
    const collector = new Collector(formatter, true)
    collector.setValue('username', 'virk')
    collector.setValue('age', 22)
    collector.setValue('email', 'virk@adonisjs.com')

    assert.deepEqual(collector.getData(), {
      username: 'virk',
      age: 22,
      email: 'virk@adonisjs.com',
    })
  })

  test('collect nested values for a data pointer', (assert) => {
    const formatter = new ErrorFormatter()
    const collector = new Collector(formatter, true)
    collector.setValue('user.username', 'virk')
    collector.setValue('user.age', 22)
    collector.setValue('user.email', 'virk@adonisjs.com')

    assert.deepEqual(collector.getData(), {
      user: {
        username: 'virk',
        age: 22,
        email: 'virk@adonisjs.com',
      },
    })
  })

  test('collect nested values for an array index', (assert) => {
    const formatter = new ErrorFormatter()
    const collector = new Collector(formatter, true)
    collector.setValue('users.0.username', 'virk')
    collector.setValue('users.0.age', 22)
    collector.setValue('users.1.email', 'virk@adonisjs.com')
    collector.setValue('users.1.username', undefined)

    assert.deepEqual(collector.getData(), {
      users: [{
        username: 'virk',
        age: 22,
      }, {
        email: 'virk@adonisjs.com',
      }],
    })
  })

  test('collect array literal values', (assert) => {
    const formatter = new ErrorFormatter()
    const collector = new Collector(formatter, true)
    collector.setValue('stock.0', 22)
    collector.setValue('stock.1', 24)

    assert.deepEqual(collector.getData(), {
      stock: [22, 24],
    })
  })

  test('report error message to the formatter', (assert) => {
    const formatter = new ErrorFormatter()
    const collector = new Collector(formatter, true)
    collector.setError('username', { name: 'required', args: [] }, 'Username is required')

    assert.deepEqual(collector.getErrors(), [
      {
        field: 'username',
        message: 'Username is required',
        validation: 'required',
      },
    ])
  })

  test('invoke message function', (assert) => {
    const formatter = new ErrorFormatter()
    const collector = new Collector(formatter, true)
    collector.setError('username', { name: 'required', args: [] }, () => 'Username is required')

    assert.deepEqual(collector.getErrors(), [
      {
        field: 'username',
        message: 'Username is required',
        validation: 'required',
      },
    ])
  })

  test('fallback to default message when message is undefined', (assert) => {
    const formatter = new ErrorFormatter()
    const collector = new Collector(formatter, true)
    collector.setError('username', { name: 'required', args: [] })

    assert.deepEqual(collector.getErrors(), [
      {
        field: 'username',
        message: 'required validation failed on username',
        validation: 'required',
      },
    ])
  })
})
