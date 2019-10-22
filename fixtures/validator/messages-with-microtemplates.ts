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
  const schema = { username: 'required', age: 'required' }
  const messages = {
    'required': '{{ field }} is required',
  }
  const data = {}
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
      field: 'username',
      message: 'username is required',
      validation: 'required',
    },
    {
      field: 'age',
      message: 'age is required',
      validation: 'required',
    },
  ])
}
