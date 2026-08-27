'use strict'

var cardinal = require('..')
var output = cardinal.highlight('var value = 1;', { linenos: true })

if (typeof output !== 'string' || output.indexOf('value') === -1) process.exit(1)
if (cardinal.highlight('', { linenos: true }) !== '') process.exit(1)
if (cardinal.highlight('var value = 1;', { theme: 'hide-semicolons' }).indexOf(';') !== -1) process.exit(1)

console.log('Runtime compatibility checks passed on ' + process.version + '.')
