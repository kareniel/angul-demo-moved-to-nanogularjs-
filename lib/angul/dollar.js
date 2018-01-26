var documentReady = require('document-ready')

function Dollar (el) {
  if (!(this instanceof Dollar)) return new Dollar(el)
  Array.call(this)
  this[0] = el
}

Dollar.prototype = Object.create(Array.prototype)

Dollar.prototype.ready = documentReady

Dollar.prototype.constructor = Dollar

module.exports = Dollar
