var documentReady = require('document-ready')
var element = require('./dollar')
var Module = require('./Module')

module.exports = (function () {
  var angul = {
    bootstrap,
    module,
    element,
    _defineModule,
    _modules: {}
  }

  function bootstrap ($el, apps) {
    documentReady(function () {
      console.log('cool', $el, apps)
    })
  }

  function _defineModule (name, deps) {
    var module = Module(name, deps)
    angul._modules[name] = module
    return module
  }

  function module (name, deps) {
    // set
    if (deps) return angul._defineModule(name, deps)

    // get
    var module = angul._modules[name]
    if (!module) throw new Error(`Module '${name}' not found.`)
    return module
  }

  return angul
})()
