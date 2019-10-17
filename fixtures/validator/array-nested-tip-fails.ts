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
    'users.roles.*': 'required',
  }

  const messages = {
    'users.roles.*.required': 'Please define user roles',
  }

  const data = {
    users: {
      roles: [''],
    },
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
      field: 'users.roles.0',
      message: 'Please define user roles',
      validation: 'required',
    },
  ])
}
