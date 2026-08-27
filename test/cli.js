'use strict'

var test = require('tape')
var spawn = require('child_process').spawn
var fs = require('fs')
var os = require('os')
var path = require('path')

var cli = path.join(__dirname, '..', 'bin', 'cdl.js')
var home = fs.mkdtempSync(path.join(os.tmpdir(), 'stackline-cardinal-home-'))

test.onFinish(function() {
  fs.rmSync(home, { recursive: true, force: true })
})

test('stdin chunks do not change a logical source line', function(t) {
  runChunks(['var lo', 'ngName = 1;\n'], function(error, output) {
    t.error(error)
    t.equal(stripAnsi(output), 'var longName = 1;\n')
    t.end()
  })
})

test('one trailing input newline produces one output newline', function(t) {
  runChunks(['const value = true;\n'], function(error, output) {
    t.error(error)
    t.equal(stripAnsi(output), 'const value = true;\n')
    t.end()
  })
})

test('a final line without a newline is flushed once', function(t) {
  runChunks(['var value = 1;'], function(error, output) {
    t.error(error)
    t.equal(stripAnsi(output), 'var value = 1;\n')
    t.end()
  })
})

function runChunks(chunks, callback) {
  var child = spawn(process.execPath, [cli], {
    env: Object.assign({}, process.env, { HOME: home }),
    stdio: ['pipe', 'pipe', 'pipe']
  })
  var stdout = ''
  var stderr = ''
  child.stdout.setEncoding('utf8')
  child.stderr.setEncoding('utf8')
  child.stdout.on('data', function(chunk) { stdout += chunk })
  child.stderr.on('data', function(chunk) { stderr += chunk })
  child.on('close', function(code) {
    callback(code === 0 ? null : new Error(stderr || 'CLI exited ' + code), stdout)
  })

  chunks.forEach(function(chunk, index) {
    setTimeout(function() {
      child.stdin.write(chunk)
      if (index === chunks.length - 1) child.stdin.end()
    }, index * 30)
  })
}

function stripAnsi(value) {
  return value.replace(/\u001b\[[0-9;]*m/g, '')
}
