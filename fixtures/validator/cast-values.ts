/*
* indicative-compiler
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { Assert } from 'japa/build/src/Assert'

export function input () {
  const schema = {
    'age': 'number',
    'created_at': 'date',
    'users.*.profiles.*.age': 'number',
    'users.*.is_admin': 'boolean',
    'lucky_numbers.*': 'number',
  }

  const messages = {
  }

  const data = {
    age: '22',
    created_at: '2019-06-07',
    users: [
      {
        profiles: [{ username: 'virk', age: '22' }, { username: 'h virk', age: '22' }],
        is_admin: 'true',
      },
    ],
    lucky_numbers: ['22', '24', '28'],
  }

  const validations = {
    number: {
      async: false,
      validate (data, field) {
        data.tip[field] = Number(data.tip[field])
        return true
      },
    },
    boolean: {
      async: false,
      validate (data, field) {
        data.tip[field] = data.tip[field] === 'true'
        return true
      },
    },
    date: {
      async: false,
      validate (data, field) {
        data.tip[field] = new Date(data.tip[field])
        return true
      },
    },
  }

  return { schema, messages, data, validations, casts: true }
}

export function assertions (assert: Assert, data: any, errorMessages: any[] | null) {
  assert.deepEqual(Object.keys(data), ['age', 'created_at', 'users', 'lucky_numbers'])

  assert.deepEqual(data.age, 22)
  assert.equal(data.created_at.getDate(), '07')
  assert.equal(data.created_at.getMonth() + 1, '06')
  assert.equal(data.created_at.getFullYear(), '2019')
  assert.lengthOf(data.users, 1)
  assert.deepEqual(data.lucky_numbers, [22, 24, 28])

  assert.deepEqual(Object.keys(data.users[0]), ['profiles', 'is_admin'])
  assert.deepEqual(data.users[0].is_admin, true)
  assert.deepEqual(data.users[0].profiles, [{ age: 22 }, { age: 22 }])
  assert.isNull(errorMessages)
}
