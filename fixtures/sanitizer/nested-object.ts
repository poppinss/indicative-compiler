/*
* indicative-compiler
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { Assert } from 'japa/build/src/Assert'
import { patchValue, getValue } from 'indicative-utils'

export function input () {
  const schema = {
    'user.username': 'escape',
    'user.email': 'escape',
  }

  const data = {
    user: {
      username: 'virk',
      email: 'virk@adonisjs.com',
    },
    age: 22,
  }

  const sanitizations = {
    escape: {
      sanitize (data, field) {
        patchValue(data, field, `${getValue(data, field)}-escaped`)
      },
    },
  }

  return { schema, data, sanitizations }
}

export function assertions (assert: Assert, data: any) {
  assert.deepEqual(data, {
    user: {
      username: 'virk-escaped',
      email: 'virk@adonisjs.com-escaped',
    },
    age: 22,
  })
}
