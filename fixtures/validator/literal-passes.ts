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
  const messages = {}
  const data = {
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
    username: 'virk',
    age: 22,
  })
  assert.isNull(errorMessages)
}
