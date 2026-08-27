'use strict'

var path =  require('path')
var fs   =  require('fs')
var home =  process.env.HOME
var resolveThemeValue = require('./lib/resolve-theme')

function getSettings(home_) {
  var settingsJson
  try {
    settingsJson = fs.readFileSync(path.join(home_ || home, '.cardinalrc'), 'utf-8')
  } catch (_) {
    // no .cardinalrc found - not a problem
    return undefined
  }
  try {
    return JSON.parse(settingsJson)
  } catch (e) {
    // Have a .cardinalrc, but something about it is wrong - warn the user
    // Coudn't parse the contained JSON
    console.error(e)
    return undefined
  }
}

// home_ mainly to be used during tests
// Resolves the preferred theme from the .cardinalrc found in the HOME directory
// If it couldn't be resolved, undefined is returned
function resolveTheme(home_) {
  var settings = getSettings(home_)

  if (!settings || !settings.theme) return undefined

  try {
    return resolveThemeValue(settings.theme)
  } catch (e) {
    // Specified theme path is invalid
    console.error(e)
    return undefined
  }
}

module.exports = {
    resolveTheme: resolveTheme
  , getSettings: getSettings
}
