var angular = require('angular') // require('../lib/angul')
var router = require('../lib/router')(angular)

angular
  .module('angul-demo', [ router ])
  .component('app', require('./components/app.component'))
  .component('pageone', require('./views/page-one'))
  .component('pagetwo', require('./views/page-two'))

angular.element(document).ready(function () {
  angular.bootstrap(angular.element(document), ['angul-demo'])
})
