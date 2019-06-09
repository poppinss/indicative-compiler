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
  const schema = { username: 'escape', age: 'escape' }
  const data = {
    username: 'virk',
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
    username: 'virk-escaped',
    age: '22-escaped',
  })
}
