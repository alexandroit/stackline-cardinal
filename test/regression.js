'use strict'

var test = require('tape')
var path = require('path')
var fs = require('fs')
var os = require('os')
var spawnSync = require('child_process').spawnSync
var cardinal = require('..')
var espree = require('espree')

test('empty highlighted input with line numbers terminates', function(t) {
  var checked = spawnSync(process.execPath, ['-e', [
    "var cardinal = require('./');",
    "if (cardinal.highlight('', { linenos: true }) !== '') process.exit(1);"
  ].join('')], { cwd: path.join(__dirname, '..'), encoding: 'utf8', timeout: 1000 })

  t.equal(checked.signal, null, 'process was not terminated by the timeout')
  t.equal(checked.status, 0, checked.stderr)
  t.end()
})

test('line numbers support six digits', function(t) {
  var result = cardinal.highlight('var value = 1;', { linenos: true, firstline: 100000 })
  t.ok(result.indexOf('100000: ') !== -1, 'six-digit first line is rendered')
  t.notOk(result.indexOf('undefined') !== -1, 'padding always returns text')
  t.end()
})

test('library resolves built-in theme names', function(t) {
  var byName = cardinal.highlight('var value = 1;', { theme: 'hide-semicolons' })
  var byObject = cardinal.highlight('var value = 1;', {
    theme: require('../themes/hide-semicolons')
  })

  t.equal(byName, byObject, 'built-in string and object themes match')
  t.end()
})

test('library resolves absolute custom theme paths', function(t) {
  var fullPath = path.join(__dirname, 'fixtures', 'custom.js')
  var byPath = cardinal.highlight('var value = true;', { theme: fullPath })
  var byObject = cardinal.highlight('var value = true;', { theme: require(fullPath) })
  t.equal(byPath, byObject)
  t.end()
})

test('library resolves custom theme paths relative to the working directory', function(t) {
  var byPath = cardinal.highlight('var value = true;', { theme: './test/fixtures/custom.js' })
  var byObject = cardinal.highlight('var value = true;', { theme: require('./fixtures/custom') })
  t.equal(byPath, byObject)
  t.end()
})

test('custom parser and parser options are forwarded', function(t) {
  var result = cardinal.highlight('class Counter { #value = 1_000n }', {
    parser: espree,
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module' }
  })

  t.ok(result.indexOf('#value') !== -1, 'modern private field remains in output')
  t.ok(result.indexOf('1_000n') !== -1, 'modern numeric syntax remains in output')
  t.end()
})

test('parse failures preserve the established error prefix', function(t) {
  try {
    cardinal.highlight('const value = `unterminated')
    t.fail('invalid source should throw')
  } catch (error) {
    t.match(error.message, /^Unable to perform highlight\. The code contained syntax errors:/)
  }
  t.end()
})

test('async file highlighting returns void and reports the result', function(t) {
  var returned = cardinal.highlightFile(path.join(__dirname, 'fixtures', 'foo.js'), function(error, output) {
    t.error(error)
    t.ok(output.indexOf('foo') !== -1)
    t.end()
  })
  t.equal(returned, undefined)
})

test('async file read errors are delivered to the callback', function(t) {
  cardinal.highlightFile(path.join(__dirname, 'fixtures', 'missing.js'), function(error, output) {
    t.match(error && error.code, /ENOENT/)
    t.equal(output, undefined)
    t.end()
  })
})

test('invalid settings files and theme paths fail tolerantly', function(t) {
  var home = fs.mkdtempSync(path.join(os.tmpdir(), 'stackline-cardinal-settings-'))
  var settingsPath = require.resolve('../settings')
  var originalError = console.error
  console.error = function() {}

  try {
    fs.writeFileSync(path.join(home, '.cardinalrc'), '{broken json', 'utf8')
    delete require.cache[settingsPath]
    t.equal(require('../settings').getSettings(home), undefined, 'invalid JSON is ignored')

    fs.writeFileSync(path.join(home, '.cardinalrc'), JSON.stringify({ theme: './missing-theme.js' }), 'utf8')
    delete require.cache[settingsPath]
    t.equal(require('../settings').resolveTheme(home), undefined, 'invalid theme is ignored')
  } finally {
    console.error = originalError
    delete require.cache[settingsPath]
    fs.rmSync(home, { recursive: true, force: true })
  }
  t.end()
})
