'use strict'

var assert = require('node:assert/strict')
var baseline = require('cardinal-baseline')
var cardinal = require('..')
var customTheme = require('./fixtures/custom')

var sources = [
  'var value = 1;',
  'const value = true;',
  'if (value) return null;',
  'function add(a, b) { return a + b; }',
  'class Box { constructor(value) { this.value = value } }',
  'const arrow = (value) => value * 2;',
  '/* block */ var value = "text"; // line',
  'x={y,...z}',
  'value **= 2',
  'async function read() { return await source }',
  'for (var i = 0; i < 3; i++) value += i',
  '#!/usr/bin/env node\nvar value = 1;',
  '{"foo":"bar","baz":null}',
  '\n/** comment */\nmodule.exports = true\n',
  'const incomplete = '
]

for (var generated = 0; generated < 85; generated++) {
  sources.push('var item' + generated + ' = ' + generated + '; // generated ' + generated)
}

var optionFactories = [
  function() { return undefined },
  function() { return {} },
  function() { return { jsx: false } },
  function() { return { linenos: false } },
  function() { return { linenos: true } },
  function() { return { linenos: true, firstline: 99 } },
  function() { return { theme: cloneTheme(customTheme) } }
]

var comparisons = 0
sources.forEach(function(source, sourceIndex) {
  optionFactories.forEach(function(optionsFactory, optionsIndex) {
    var expected = outcome(baseline, source, optionsFactory())
    var actual = outcome(cardinal, source, optionsFactory())
    assert.deepEqual(actual, expected, 'baseline mismatch at ' + sourceIndex + ':' + optionsIndex)
    comparisons += 1
  })
})

console.log('Compatibility checks passed: ' + comparisons + ' differential executions.')

function outcome(implementation, source, options) {
  try {
    return { threw: false, value: implementation.highlight(source, options) }
  } catch (error) {
    return { threw: true, name: error.name, message: error.message }
  }
}

function cloneTheme(value) {
  if (!value || typeof value !== 'object') return value
  var copy = {}
  Object.keys(value).forEach(function(key) {
    copy[key] = cloneTheme(value[key])
  })
  return copy
}
