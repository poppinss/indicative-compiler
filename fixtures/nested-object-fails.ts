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
    user: {},
  }

  const validations = {
    required: {
      async: false,
      validate () {
        return false
      },
    },
  }

  return { schema, messages, data, validations }
}

export function assertions (assert: Assert, data: any, errorMessages: any[]) {
  assert.deepEqual(data, {})
  assert.deepEqual(errorMessages, [
    {
      field: 'user.username',
      message: 'Username for user is required',
      validation: 'required',
    },
    {
      field: 'user.age',
      message: 'Age for user is required',
      validation: 'required',
    },
    {
      field: 'username',
      message: 'Username is required',
      validation: 'required',
    },
  ])
}
