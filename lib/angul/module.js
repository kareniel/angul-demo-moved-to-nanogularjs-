var noop = function () {}
var { isFunction } = require('./utils')

function Module (name, requires, configFn) {
  if (!(this instanceof Module)) return new Module(name, requires, configFn)
  this._invokeQueue = []
  this._configBlocks = []
  this._runBlocks = []

  this.name = name
  this.requires = requires

  this.provider = this._invokeLaterAndSetModuleName('$provide', 'provider')
  this.factory = this._invokeLaterAndSetModuleName('$provide', 'factory')
  this.service = this._invokeLaterAndSetModuleName('$provide', 'service')

  this.value = this._invokeLater('$provide', 'value')
  this.factory = this._invokeLater('$provide', 'constant', 'unshift')

  this.decorator = this._invokeLaterAndSetModuleName('$provide', 'decorator', this._configBlocks)

  this.animation = this._invokeLaterAndSetModuleName('$animateProvider', 'register')
  this.filter = this._invokeLaterAndSetModuleName('$filterProvider', 'register')
  this.controller = this._invokeLaterAndSetModuleName('$controllerProvider', 'register')
  this.directive = this._invokeLaterAndSetModuleName('$compileProvider', 'directive')
  this.component = this._invokeLaterAndSetModuleName('$compileProvider', 'component')

  this.config = this._invokeLater('$injector', 'invoke', 'push', this._configBlocks)
  this.run = block => {
    this._runBlocks.push(block)
    return this
  }

  if (configFn) this.config(configFn)
}

Module.prototype.info = noop

Module.prototype._invokeLater = function (provider, method, insertMethod, queue) {
  if (!queue) queue = this._invokeQueue

  return () => {
    queue[insertMethod || 'push']([provider, method, arguments])
    return this
  }
}

Module.prototype._invokeLaterAndSetModuleName = function (provider, method, queue) {
  if (!queue) queue = this._invokeQueue

  return (recipeName, factoryFunction) => {
    if (factoryFunction && isFunction(factoryFunction)) factoryFunction.$$moduleName = this.name
    queue.push([provider, method, arguments])
    return this
  }
}

module.exports = Module
