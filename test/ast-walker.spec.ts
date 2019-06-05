/**
 * indicative-compiler
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import * as test from 'japa'
import { TreeWalker } from '../src/TreeWalker'
import { rulesParser } from 'indicative-parser'

test.group('Tree walker', () => {
  test('walk over all literal nodes', (assert) => {
    const schema = {
      username: 'required',
      age: 'required',
    }

    const stack = new TreeWalker((field, rules, dotPath) => {
      return { field, rules, dotPath }
    }, () => {}).walk(rulesParser(schema))

    assert.deepEqual(stack, [
      {
        field: 'username',
        rules: [{ name: 'required', args: [] }],
        dotPath: [],
      },
      {
        field: 'age',
        rules: [{ name: 'required', args: [] }],
        dotPath: [],
      },
    ])
  })

  test('walk over all object nodes', (assert) => {
    const schema = {
      'user.username': 'required',
      age: 'required',
    }

    const stack = new TreeWalker((field, rules, dotPath) => {
      return { field, rules, dotPath }
    }, () => {}).walk(rulesParser(schema))

    assert.deepEqual(stack, [
      {
        field: 'username',
        rules: [{ name: 'required', args: [] }],
        dotPath: ['user'],
      },
      {
        field: 'age',
        rules: [{ name: 'required', args: [] }],
        dotPath: [],
      },
    ])
  })

  test('walk over all object node parent and children both', (assert) => {
    const schema = {
      user: 'required',
      'user.username': 'required',
      age: 'required',
    }

    const stack = new TreeWalker((field, rules, dotPath) => {
      return { field, rules, dotPath }
    }, () => {}).walk(rulesParser(schema))

    assert.deepEqual(stack, [
      {
        field: 'user',
        rules: [{ name: 'required', args: [] }],
        dotPath: [],
      },
      {
        field: 'username',
        rules: [{ name: 'required', args: [] }],
        dotPath: ['user'],
      },
      {
        field: 'age',
        rules: [{ name: 'required', args: [] }],
        dotPath: [],
      },
    ])
  })

  test('walk over all array nodes', (assert) => {
    const schema = {
      'users.*.username': 'required',
    }

    const stack = new TreeWalker((field, rules, dotPath) => {
      return { field, rules, dotPath }
    }, (index, field, children, dotPath) => {
      return { index, field, children, dotPath }
    }).walk(rulesParser(schema))

    assert.deepEqual(stack, [
      {
        index: '*',
        dotPath: [],
        field: 'users',
        children: [
          {
            field: 'username',
            rules: [{ name: 'required', args: [] }],
            dotPath: [],
          },
        ],
      },
    ])
  })

  test('walk over array nested inside object nodes', (assert) => {
    const schema = {
      'user.profiles.*.username': 'required',
    }

    const stack = new TreeWalker((field, rules, dotPath) => {
      return { field, rules, dotPath }
    }, (index, field, children, dotPath) => {
      return { index, field, children, dotPath }
    }).walk(rulesParser(schema))

    assert.deepEqual(stack, [
      {
        index: '*',
        dotPath: ['user'],
        field: 'profiles',
        children: [
          {
            field: 'username',
            rules: [{ name: 'required', args: [] }],
            dotPath: [],
          },
        ],
      },
    ])
  })

  test('walk over array nested child', (assert) => {
    const schema = {
      'users': 'required',
      'users.*.profile': 'required',
      'users.*.profile.username': 'required',
    }

    const stack = new TreeWalker((field, rules, dotPath) => {
      return { field, rules, dotPath }
    }, (index, field, children, dotPath) => {
      return { index, field, children, dotPath }
    }).walk(rulesParser(schema))

    assert.deepEqual(stack, [
      {
        field: 'users',
        rules: [{ name: 'required', args: [] }],
        dotPath: [],
      },
      {
        index: '*',
        dotPath: [],
        field: 'users',
        children: [
          {
            field: 'profile',
            rules: [{ name: 'required', args: [] }],
            dotPath: [],
          },
          {
            field: 'username',
            rules: [{ name: 'required', args: [] }],
            dotPath: ['profile'],
          },
        ],
      },
    ])
  })

  test('walk over array indexed and wildcard children', (assert) => {
    const schema = {
      'users': 'required',
      'users.0.profile.type': 'required',
      'users.*.profile': 'required',
      'users.*.profile.username': 'required',
    }

    const stack = new TreeWalker((field, rules, dotPath) => {
      return { field, rules, dotPath }
    }, (index, field, children, dotPath) => {
      return { index, field, children, dotPath }
    }).walk(rulesParser(schema))

    assert.deepEqual(stack, [
      {
        field: 'users',
        rules: [{ name: 'required', args: [] }],
        dotPath: [],
      },
      {
        index: '0',
        dotPath: [],
        field: 'users',
        children: [
          {
            field: 'type',
            rules: [{ name: 'required', args: [] }],
            dotPath: ['profile'],
          },
        ],
      },
      {
        index: '*',
        dotPath: [],
        field: 'users',
        children: [
          {
            field: 'profile',
            rules: [{ name: 'required', args: [] }],
            dotPath: [],
          },
          {
            field: 'username',
            rules: [{ name: 'required', args: [] }],
            dotPath: ['profile'],
          },
        ],
      },
    ])
  })

  test('walk over array indexed and wildcard tip', (assert) => {
    const schema = {
      'users': 'required',
      'users.0': 'required',
      'users.*': 'required',
    }

    const stack = new TreeWalker((field, rules, dotPath) => {
      return { field, rules, dotPath }
    }, (index, field, children, dotPath) => {
      return { index, field, children, dotPath }
    }).walk(rulesParser(schema))

    assert.deepEqual(stack, [
      {
        field: 'users',
        rules: [{ name: 'required', args: [] }],
        dotPath: [],
      },
      {
        index: '0',
        dotPath: [],
        field: 'users',
        children: [
          {
            field: '::tip::',
            rules: [{ name: 'required', args: [] }],
            dotPath: [],
          },
        ],
      },
      {
        index: '*',
        dotPath: [],
        field: 'users',
        children: [
          {
            field: '::tip::',
            rules: [{ name: 'required', args: [] }],
            dotPath: [],
          },
        ],
      },
    ])
  })

  test('walk over nested arrays', (assert) => {
    const schema = {
      'users.*.profiles.*.username': 'required',
      'users.*.account_status': 'required',
    }

    const stack = new TreeWalker((field, rules, dotPath) => {
      return { field, rules, dotPath }
    }, (index, field, children, dotPath) => {
      return { index, field, children, dotPath }
    }).walk(rulesParser(schema))

    assert.deepEqual(stack, [
      {
        index: '*',
        dotPath: [],
        field: 'users',
        children: [
          {
            field: 'profiles',
            index: '*',
            dotPath: [],
            children: [
              {
                field: 'username',
                rules: [{ name: 'required', args: [] }],
                dotPath: [],
              },
            ],
          },
          {
            field: 'account_status',
            rules: [{ name: 'required', args: [] }],
            dotPath: [],
          },
        ],
      },
    ])
  })
})
