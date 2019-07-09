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
    'user.username': 'required',
    'user.age': 'required',
    'username': 'required',
  }

  const messages = {
    'user.username.required': 'Username for user is required',
    'user.age.required': 'Age for user is required',
    'username.required': 'Username is required',
  }

  const data = {
    user: {
      username: 'virk',
      age: 22,
    },
    username: 'virk',
    age: 22,
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
    user: {
      username: 'virk',
      age: 22,
    },
    username: 'virk',
  })
  assert.isNull(errorMessages)
}
