module.exports = {
  bindings: {
    state: '<'
  },
  controller: AppController,
  template: `<div><div></div></div>`
}

function AppController ($rootScope, $scope, $element, $compile) {
  var ctrl = this

  $rootScope.$watch('state', function (prev, curr) {
    if (prev.currentPage !== curr.currentPage) { return ctrl.replace() }
  }, true)

  ctrl.$postLink = function () { ctrl.replace() }

  ctrl.replace = function () {
    var el = ctrl._buildElement(ctrl.state.currentPage)
    var compiledEl = $compile(el)($scope.$parent)

    angular.element($element.children()[0]).replaceWith(compiledEl)
  }

  ctrl._buildElement = function (tag) {
    var el = document.createElement(tag)
    var $el = angular.element(el)

    return $el
  }
}
