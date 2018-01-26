var angular = require('angular')
var router = require('./router')

angular
  .module('angul-demo', [])
  .run(router)
  .component('app', require('./components/app.component'))
  .component('pageone', require('./views/page-one'))
  .component('pagetwo', require('./views/page-two'))

angular.element(document).ready(function () {
  angular.bootstrap(angular.element(document), ['angul-demo'])
})
