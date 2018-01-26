var Injector = require('./injector')

function Provide (injector) {
  this.injector = Injector()
  this.cache = {
    $provide: {}
  }
}

Provide.prototype.create = {
  provider,
  constant,
  value,
  factory,
  service,
  decorator
}

function provider (name, fn) {
  fn = this.injector.instantiate(fn)

  this.cache[name + 'Provider'] = fn

  return fn
}

function factory (name, fn) {
  return provider(name, { $get: fn })
}

function service (name, constructor) {
  return factory(name, function ($injector) {
    return $injector.instantiate(constructor)
  })
}

function value (name, val) {
  return factory(name, valueFn(val))
}

function constant (name, val) {
  this.cache[name] = val
}

function valueFn (value) {
  return function () {
    return value
  }
}

function decorator (name, fn) {
  var prevProvider = this.injector.get(name + 'Provider')
  var prev$get = provider.$get

  provider.$get = () => {
    var prevInstance = this.injector.invoke(prev$get, prevProvider)
    var locals = { $delegate: prevInstance }

    return this.injector.invoke(fn, null, locals)
  }
}
