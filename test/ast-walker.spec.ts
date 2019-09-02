/**
 * indicative-compiler
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import test from 'japa'
import { TreeWalker } from '../src/TreeWalker'
import { rulesParser } from 'indicative-parser'

test.group('Tree walker', () => {
  test('walk over all literal nodes', (assert) => {
    const schema = {
      username: 'required',
      age: 'required',
    }

    const stack = new TreeWalker((field, type, rules, dotPath, pointer) => {
      return { field, type, rules, dotPath, pointer }
    }, () => {}).walk(rulesParser(schema))

    assert.deepEqual(stack, [
      {
        field: 'username',
        type: 'literal',
        rules: [{ name: 'required', args: [] }],
        dotPath: [],
        pointer: 'username',
      },
      {
        field: 'age',
        type: 'literal',
        rules: [{ name: 'required', args: [] }],
        dotPath: [],
        pointer: 'age',
      },
    ])
  })

  test('walk over all object nodes', (assert) => {
    const schema = {
      'user.username': 'required',
      age: 'required',
    }

    const stack = new TreeWalker((field, type, rules, dotPath, pointer) => {
      return { field, type, rules, dotPath, pointer }
    }, () => {}).walk(rulesParser(schema))

    assert.deepEqual(stack, [
      {
        field: 'username',
        type: 'literal',
        rules: [{ name: 'required', args: [] }],
        dotPath: ['user'],
        pointer: 'user.username',
      },
      {
        field: 'age',
        type: 'literal',
        rules: [{ name: 'required', args: [] }],
        dotPath: [],
        pointer: 'age',
      },
    ])
  })

  test('walk over all object node parent and children both', (assert) => {
    const schema = {
      user: 'required',
      'user.username': 'required',
      age: 'required',
    }

    const stack = new TreeWalker((field, type, rules, dotPath, pointer) => {
      return { field, type, rules, dotPath, pointer }
    }, () => {}).walk(rulesParser(schema))

    assert.deepEqual(stack, [
      {
        field: 'user',
        type: 'object',
        rules: [{ name: 'required', args: [] }],
        dotPath: [],
        pointer: 'user',
      },
      {
        field: 'username',
        type: 'literal',
        rules: [{ name: 'required', args: [] }],
        dotPath: ['user'],
        pointer: 'user.username',
      },
      {
        field: 'age',
        type: 'literal',
        rules: [{ name: 'required', args: [] }],
        dotPath: [],
        pointer: 'age',
      },
    ])
  })

  test('walk over all array nodes', (assert) => {
    const schema = {
      'users.*.username': 'required',
    }

    const stack = new TreeWalker((field, type, rules, dotPath, pointer) => {
      return { field, type, rules, dotPath, pointer }
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
            type: 'literal',
            rules: [{ name: 'required', args: [] }],
            dotPath: [],
            pointer: 'users.*.username',
          },
        ],
      },
    ])
  })

  test('walk over array nested inside object nodes', (assert) => {
    const schema = {
      'user.profiles.*.username': 'required',
    }

    const stack = new TreeWalker((field, type, rules, dotPath, pointer) => {
      return { field, type, rules, dotPath, pointer }
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
            type: 'literal',
            rules: [{ name: 'required', args: [] }],
            dotPath: [],
            pointer: 'user.profiles.*.username',
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

    const stack = new TreeWalker((field, type, rules, dotPath, pointer) => {
      return { field, type, rules, dotPath, pointer }
    }, (index, field, children, dotPath) => {
      return { index, field, children, dotPath }
    }).walk(rulesParser(schema))

    assert.deepEqual(stack, [
      {
        field: 'users',
        type: 'array',
        rules: [{ name: 'required', args: [] }],
        dotPath: [],
        pointer: 'users',
      },
      {
        index: '*',
        dotPath: [],
        field: 'users',
        children: [
          {
            field: 'profile',
            type: 'object',
            rules: [{ name: 'required', args: [] }],
            dotPath: [],
            pointer: 'users.*.profile',
          },
          {
            field: 'username',
            type: 'literal',
            rules: [{ name: 'required', args: [] }],
            dotPath: ['profile'],
            pointer: 'users.*.profile.username',
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

    const stack = new TreeWalker((field, type, rules, dotPath, pointer) => {
      return { field, type, rules, dotPath, pointer }
    }, (index, field, children, dotPath) => {
      return { index, field, children, dotPath }
    }).walk(rulesParser(schema))

    assert.deepEqual(stack, [
      {
        field: 'users',
        type: 'array',
        rules: [{ name: 'required', args: [] }],
        dotPath: [],
        pointer: 'users',
      },
      {
        index: '0',
        dotPath: [],
        field: 'users',
        children: [
          {
            field: 'type',
            type: 'literal',
            rules: [{ name: 'required', args: [] }],
            dotPath: ['profile'],
            pointer: 'users.0.profile.type',
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
            type: 'object',
            rules: [{ name: 'required', args: [] }],
            dotPath: [],
            pointer: 'users.*.profile',
          },
          {
            field: 'username',
            type: 'literal',
            rules: [{ name: 'required', args: [] }],
            dotPath: ['profile'],
            pointer: 'users.*.profile.username',
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

    const stack = new TreeWalker((field, type, rules, dotPath, pointer) => {
      return { field, type, rules, dotPath, pointer }
    }, (index, field, children, dotPath) => {
      return { index, field, children, dotPath }
    }).walk(rulesParser(schema))

    assert.deepEqual(stack, [
      {
        field: 'users',
        type: 'array',
        rules: [{ name: 'required', args: [] }],
        dotPath: [],
        pointer: 'users',
      },
      {
        index: '0',
        dotPath: [],
        field: 'users',
        children: [
          {
            field: '::tip::',
            type: 'literal',
            rules: [{ name: 'required', args: [] }],
            dotPath: [],
            pointer: 'users.0',
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
            type: 'literal',
            rules: [{ name: 'required', args: [] }],
            dotPath: [],
            pointer: 'users.*',
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

    const stack = new TreeWalker((field, type, rules, dotPath, pointer) => {
      return { field, type, rules, dotPath, pointer }
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
                type: 'literal',
                rules: [{ name: 'required', args: [] }],
                dotPath: [],
                pointer: 'users.*.profiles.*.username',
              },
            ],
          },
          {
            field: 'account_status',
            type: 'literal',
            rules: [{ name: 'required', args: [] }],
            dotPath: [],
            pointer: 'users.*.account_status',
          },
        ],
      },
    ])
  })
})
