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
    'users.*.profiles.*.username': 'required',
    'users.*.profiles.0.age': 'required',
    'users.*.type': 'required',
  }

  const messages = {
    'users.*.profiles.*.username.required': 'Profile username is required',
    'users.*.type.required': 'Account must have a type',
  }

  const data = {
    users: [
      {
        profiles: [{ username: 'virk', age: 22 }, { username: 'h virk', age: 22 }],
        type: 'admin',
      },
    ],
  }

  const validations = {
    required: {
      async: false,
      validate () {
        return true
      },
    },
  }

  return { schema, messages, data, validations }
}

export function assertions (assert: Assert, data: any, errorMessages: any[] | null) {
  assert.deepEqual(data, {
    users: [{
      profiles: [{ username: 'virk', age: 22 }, { username: 'h virk' }],
      type: 'admin',
    }],
  })
  assert.isNull(errorMessages)
}
