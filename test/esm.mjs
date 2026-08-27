import assert from 'node:assert/strict'
import cardinal, { highlight, highlightFile, highlightFileSync } from '../index.mjs'

assert.equal(highlight, cardinal.highlight)
assert.equal(highlightFile, cardinal.highlightFile)
assert.equal(highlightFileSync, cardinal.highlightFileSync)
assert.match(highlight('const value = 1'), /\u001b\[/)

console.log('Native ESM checks passed.')
