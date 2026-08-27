import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import vm from 'node:vm'

const source = await readFile(new URL('../dist/cardinal.global.js', import.meta.url), 'utf8')
const context = { console }
vm.runInNewContext(source, context, { filename: 'cardinal.global.js' })

assert.equal(typeof context.Cardinal.default.highlight, 'function')
assert.match(context.Cardinal.default.highlight('var value = 1;'), /\u001b\[/)
assert.match(context.Cardinal.default.highlight('var value = 1;', { theme: 'hide-semicolons' }), /\u001b\[30m;/)
assert.throws(() => context.Cardinal.default.highlightFileSync('example.js'), /available only in Node\.js/)

console.log('Browser bundle checks passed.')
