var nanorouter = require('nanorouter')
var nanohref = require('nanohref')
var nanoquery = require('nanoquery')
var nanolocation = require('nanolocation')

module.exports = function ($rootScope) {
  var router = nanorouter({ default: '/404' })
  var HISTORY_OBJECT = {}
  var state = {
    currentPage: 'pageone'
  }

  $rootScope.state = state

  router.on('/', function (params) {
    $rootScope.state.currentPage = 'pageone'
    $rootScope.$digest()
  })

  router.on('/2', function (params) {
    $rootScope.state.currentPage = 'pagetwo'
    $rootScope.$digest()
  })

  nanohref(function (location) {
    var href = location.href
    var currHref = window.location.href
    if (href === currHref) return
    push(href)
  })

  function push (href) {
    window.history.pushState(HISTORY_OBJECT, null, href)
    navigate()
  }

  function navigate () {
    matchRoute()
    render()
  }

  function render () {
    prerender()
  }

  function prerender () {
    state._handler(state, function () {
      console.log(...arguments)
    })
  }

  function matchRoute () {
    var location = nanolocation()
    var queryString = window.location.search
    var matched = router.match(location)

    state.href = location
    state.query = nanoquery(queryString)
    state.route = matched.route
    state.params = matched.params
    state._handler = matched.cb

    return state
  }

  navigate()
}
