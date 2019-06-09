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
    'users.*.profiles.*.username': 'escape',
    'lucky_numbers.*': 'escape',
  }

  const data = {
    users: [
      {
        profiles: [
          {
            username: 'virk',
            email: 'virk@adonisjs.com',
          },
          {
            username: 'nikk',
            email: 'nikk@adonisjs.com',
          },
        ],
      },
    ],
    lucky_numbers: [10, 20, 30],
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
        profiles: [
          {
            username: 'virk-escaped',
            email: 'virk@adonisjs.com',
          },
          {
            username: 'nikk-escaped',
            email: 'nikk@adonisjs.com',
          },
        ],
      },
    ],
    lucky_numbers: ['10-escaped', '20-escaped', '30-escaped'],
  })
}
