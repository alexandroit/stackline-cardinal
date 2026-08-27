'use strict'

// applying esprima to a bunch of files of contained libraries as a smoke test
var test     =  require('tape')
var path     =  require('path')
var fs       =  require('fs')
var cardinal  =  require('..')
var nodeModules =  path.join(__dirname, '..', 'node_modules')
var tapedir       =  path.join(nodeModules, 'tape')
var redeyeddir   =  path.join(nodeModules, 'redeyed')

function javascriptFiles(root) {
  var files = []
  fs.readdirSync(root).forEach(function(name) {
    var fullPath = path.join(root, name)
    var stat = fs.statSync(fullPath)
    if (stat.isDirectory()) files = files.concat(javascriptFiles(fullPath))
    else if (path.extname(name) === '.js') files.push(fullPath)
  })
  return files
}

test('tape', function(t) {
  javascriptFiles(tapedir).forEach(function(fullPath) {
      var code = fs.readFileSync(fullPath, 'utf-8')
      var result = cardinal.highlight(code)

      if (!(/^[^/*]*var /.test(code))) {
        t.pass('skipping ' + path.relative(tapedir, fullPath) + ' due to missing var statement')
      } else {
        t.assert(~result.indexOf('[32mvar\u001b[39m'), 'highlighted ' + path.relative(tapedir, fullPath))
      }
  })
  t.end()
})

test('redeyed', function(t) {
  javascriptFiles(redeyeddir).filter(function(fullPath) {
    return path.basename(fullPath) === 'redeyed.js'
  }).forEach(function(fullPath) {
      var code = fs.readFileSync(fullPath, 'utf-8')
      var result = cardinal.highlight(code)

      t.assert(~result.indexOf('[32mvar\u001b[39m') || !(~result.indexOf('var ')), 'highlighted ' + path.relative(redeyeddir, fullPath))
  })
  t.end()
})
