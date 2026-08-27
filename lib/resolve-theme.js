'use strict'

var path = require('path')

var themes = Object.create(null)
themes.default = require('../themes/default')
themes.empty = require('../themes/empty')
themes['hide-semicolons'] = require('../themes/hide-semicolons')
themes.jq = require('../themes/jq')
themes['tomorrow-night'] = require('../themes/tomorrow-night')

module.exports = function resolveTheme(theme) {
  if (!theme) return themes.default
  if (typeof theme !== 'string') return theme

  var name = theme.endsWith('.js') ? theme.slice(0, -3) : theme
  if (Object.prototype.hasOwnProperty.call(themes, name)) return themes[name]

  var themePath = path.isAbsolute(theme) ? theme : path.resolve(process.cwd(), theme)
  return require(themePath)
}

module.exports.themes = themes
