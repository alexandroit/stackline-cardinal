const commonGlobals = {
  Array: 'readonly', Buffer: 'readonly', Error: 'readonly', JSON: 'readonly',
  Map: 'readonly', Number: 'readonly', Object: 'readonly', Promise: 'readonly',
  RegExp: 'readonly', Set: 'readonly', String: 'readonly', URL: 'readonly',
  clearTimeout: 'readonly', console: 'readonly', globalThis: 'readonly',
  process: 'readonly', setTimeout: 'readonly'
}

export default [
  { ignores: ['coverage/**', 'dist/**', 'node_modules/**', 'site-dist/**', 'test/fixtures/**'] },
  {
    files: ['docs-site/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: { ...commonGlobals, document: 'readonly', navigator: 'readonly' },
      sourceType: 'script'
    },
    rules: baseRules()
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: { ...commonGlobals, __dirname: 'readonly', module: 'readonly', require: 'readonly' },
      sourceType: 'commonjs'
    },
    rules: baseRules()
  },
  {
    files: ['**/*.mjs'],
    languageOptions: { ecmaVersion: 2022, globals: commonGlobals, sourceType: 'module' },
    rules: baseRules()
  }
]

function baseRules() {
  return {
    'no-constant-binary-expression': 'error',
    'no-undef': 'error',
    'no-unreachable': 'error',
    'no-unused-vars': ['error', { args: 'none', caughtErrors: 'none' }]
  }
}
