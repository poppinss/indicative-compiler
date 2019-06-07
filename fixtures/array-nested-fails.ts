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
    'users.*.type': 'required',
  }

  const messages = {
    'users.*.profiles.*.username.required': 'Profile username is required',
    'users.*.type.required': 'Account must have a type',
  }

  const data = {
    users: [
      {
        profiles: [{}, {}],
      },
    ],
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
      field: 'users.0.profiles.0.username',
      message: 'Profile username is required',
      validation: 'required',
    },
    {
      field: 'users.0.profiles.1.username',
      message: 'Profile username is required',
      validation: 'required',
    },
    {
      field: 'users.0.type',
      message: 'Account must have a type',
      validation: 'required',
    },
  ])
}
