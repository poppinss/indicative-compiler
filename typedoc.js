module.exports = require('@adonisjs/mrm-preset/_typedoc.js')({
  exclude: [
    '**/test/*.ts',
    '**/test-helpers/*.ts',
    '**/fixtures/*.ts',
    'index.ts',
  ],
  readme: 'none',
})
