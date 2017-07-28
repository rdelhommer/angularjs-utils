(function () {
  'use strict';

  angular.module('rdelhommer.ng.directives')
    .directive('uppercase', uppercase);

  function uppercase() {
    var directive = {
      require: 'ngModel',
      link: link
    };

    return directive;

    function link(scope, element, attrs, modelCtrl) {
      modelCtrl.$parsers.push(function (input) {
        return input ? input.toUpperCase() : '';
      });
      element.css('text-transform', 'uppercase');
    }
  }
}());
