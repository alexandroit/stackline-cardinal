'use strict'

var highlight = require('./lib/highlight')

function unavailable() {
  throw new Error('File highlighting is available only in Node.js')
}

module.exports = {
  highlight: highlight,
  highlightFile: unavailable,
  highlightFileSync: unavailable
}
