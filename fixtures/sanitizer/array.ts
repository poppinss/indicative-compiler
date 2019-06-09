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
    'users.*.username': 'escape',
    'users.0.email': 'escape',
  }

  const data = {
    users: [
      {
        username: 'virk',
        email: 'virk@adonisjs.com',
      },
      {
        username: 'nikk',
        email: 'nikk@adonisjs.com',
      },
    ],
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
    users: [
      {
        username: 'virk-escaped',
        email: 'virk@adonisjs.com-escaped',
      },
      {
        username: 'nikk-escaped',
        email: 'nikk@adonisjs.com',
      },
    ],
  })
}
