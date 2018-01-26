module.exports = {
  isFunction,
  isClass
}

function isFunction (fn) {
  var getType = {}
  return fn && getType.toString.call(fn) === '[object Function]'
}

function isClass (fn) {
  if (typeof fn !== 'function') {
    return false
  }

  var result = fn.$$ngIsClass

  if (typeof (result) !== 'boolean') {
    result = fn.$$ngIsClass = /^(?:class\b|constructor\()/.test(fn.toString())
  }

  return result
}
