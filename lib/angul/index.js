var documentReady = require('document-ready')
var assert = require('assert')
var $ = require('./dollar')
var Injector = require('./injector')
var Module = require('./Module')

function Angular () {
  if (!(this instanceof Angular)) return new Angular()
  this.loadedModules = {}
}

Angular.prototype.module = function (name, modules) {
  // set
  if (modules) {
    assert.equal(Array.isArray(modules), true, '')
    var newModule = Module(name, modules)
    this.loadedModules[name] = newModule
    return newModule
  }

  // get
  var module = this._modules[name]
  if (!module) throw new Error(`Module '${name}' not found.`)
  return module
}

Angular.prototype._createInjector = function (modules) {
  var path = []

  var providerCache = {}
  var providerInjector = Injector(providerCache, function (serviceName, caller) {
    if (typeof caller === 'string') path.push(caller)
  })

  var instanceCache = {}
  var instanceInjector = Injector(instanceCache, function (serviceName, caller) {
    var provider = providerInjector.get(serviceName + 'Provider', caller)
    return instanceInjector.invoke(provider.$get, provider, undefined, serviceName)
  })

  return instanceInjector
}

Angular.prototype.bootstrap = function ($el, modules) {
  this.injector = this._createInjector(modules)

  this.injector.invoke(this._bootstrap)

  return this.injector
}

Angular.prototype._bootstrap = function (scope, element, compile, injector) {
  // scope.$apply(function () {
  //   element.data('$injector', injector)
  //   compile(element)(scope)
  // })
}

Angular.prototype._bootstrap.$inject = ['$rootScope', '$rootElement', '$compile', '$injector']

Angular.prototype.element = $

module.exports = Angular()
