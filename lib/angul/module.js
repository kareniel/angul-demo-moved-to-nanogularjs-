var fnArgs = require('fn-args')

function Module (name, deps) {
  if (!(this instanceof Module)) return new Module()
  this.name = name
}

Module.prototype.run = function (fn) {
  console.log(fnArgs(fn))
  return this
}

Module.prototype.config = function (fn) {
  return this
}

// Providers: Value, Factory, Service and Constant

Module.prototype.provider = function (name, fn) {
  return this
}

Module.prototype.value = function (name, val) {
  return this
}

Module.prototype.factory = function (name, fn) {
  return this
}

Module.prototype.service = function (name, fn) {
  return this
}

Module.prototype.constant = function (name, c) {
  return this
}

// controllers, directives, filters or animations

Module.prototype.controller = function (name, fn) {
  return this
}

Module.prototype.directive = function (name, fn) {
  return this
}

Module.prototype.filter = function (name, fn) {
  return this
}

Module.prototype.component = function (name, obj) {
  var { template, controller } = obj
  console.log(fnArgs(controller))
  return this
}

module.exports = Module
