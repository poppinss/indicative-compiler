module.exports = require('@adonisjs/mrm-preset/_typedoc.js')({
  exclude: [
    '**/test/*.ts',
    '**/fixtures/*.ts',
    'index.ts',
  ],
  readme: 'none',
})
