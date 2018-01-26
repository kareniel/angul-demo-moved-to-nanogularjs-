var assert = require('assert')
var fnArgs = require('fn-args')
var { isFunction, isClass } = require('./utils')

function Injector (modules) {
  if (!(this instanceof Injector)) return new Injector(modules)
  this._modules = modules
}

Injector.prototype.get = function (name) {
  var module = this.modules[name]
  return module
}

Injector.prototype.invoke = function (fn, self, locals, name) {
  if (typeof locals === 'string') {
    name = locals
    locals = null
  }

  var dependencies = this._getDependencies(constructor, locals, name)

  if (!isClass(fn)) {
    return fn.apply(self, dependencies)
  }

  return new (Function.prototype.bind.apply(fn, dependencies))()
}

Injector.prototype.has = function (name) {
  return !!this.get(name)
}

Injector.prototype.annotate = function (fn) {
  assert.ok(fn, 'annotate expects a function')

  if (this._isAnnotated(fn)) { return fn.$inject }
  if (this._isInline(fn)) { return fn.slice(0, fn.length - 1) }

  return fnArgs(fn)
}

Injector.prototype.instantiate = function (constructor, locals) {
  if (this._isInline(constructor)) constructor = constructor[constructor.length - 1]

  var dependencies = this._getDependencies(constructor, locals)

  return new (Function.prototype.bind.apply(constructor, dependencies))()
}

Injector.prototype._getDependencies = function (fn, locals, serviceName) {
  var names = this.annotate(fn)
  var dependencies = names.map(name => {
    if (locals && locals.hasOwnProperty(name)) { return locals[name] }
    return this.get(name)
  })

  return dependencies
}

Injector.prototype._isAnnotated = function (fn) {
  return isFunction(fn) && fn.$inject && Array.isArray(fn.$inject)
}

Injector.prototype._isInline = function (fn) {
  return Array.isArray(fn)
}

module.exports = Injector
