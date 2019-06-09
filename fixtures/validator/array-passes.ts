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
    'users.*.username': 'required',
    accepted: 'required',
  }

  const messages = {
    'users.*.username.required': 'Username for all users is required',
    'accepted.required': 'You must accept terms & conditions',
  }

  const data = {
    users: [{ username: 'virk' }, { username: 'nikk' }],
    accepted: true,
    extra: 'data',
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

export function assertions (assert: Assert, data: any, errorMessages: any[]) {
  assert.deepEqual(data, {
    users: [{ username: 'virk' }, { username: 'nikk' }],
    accepted: true,
  })
  assert.deepEqual(errorMessages, [])
}
