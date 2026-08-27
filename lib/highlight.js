'use strict'

var redeyed = require('redeyed')
var resolveTheme = require('./resolve-theme')
var colors = require('ansicolors')

var colorSurround =  colors.brightBlack
var surroundClose =  '\u001b[39m'

function trimEmptyLines(lines) {
  while (lines.length && !lines[lines.length - 1].length) lines.pop()
}

function addLinenos(highlightedCode, firstline) {
  var highlightedLines = highlightedCode.split('\n')

  trimEmptyLines(highlightedLines)

  var linesLen = highlightedLines.length
  var lines = []
  var totalDigits
  var lineno

  function pad(n, totalDigits) {
    return String(n).padStart(totalDigits, ' ')
  }

  totalDigits = String(linesLen + firstline - 1).length

  for (var i = 0; i < linesLen; i++) {
    // Don't close the escape sequence here in order to not break multi line code highlights like block comments
    lineno = colorSurround(pad(i + firstline, totalDigits) + ': ').replace(surroundClose, '')
    lines.push(lineno + highlightedLines[i])
  }

  return lines.join('\n')
}

module.exports = function highlight(code, opts) {
  opts = opts || { }
  try {
    var parserOptions = { jsx: !!opts.jsx }
    if (opts.parser) parserOptions.parser = opts.parser
    if (opts.parserOptions) parserOptions.parserOptions = opts.parserOptions

    var result = redeyed(code, resolveTheme(opts.theme), parserOptions)
    var firstline = opts.firstline && !isNaN(opts.firstline) ? opts.firstline : 1

    return opts.linenos ? addLinenos(result.code, firstline) : result.code
  } catch (e) {
    e.message = 'Unable to perform highlight. The code contained syntax errors: ' + e.message
    throw e
  }
}
