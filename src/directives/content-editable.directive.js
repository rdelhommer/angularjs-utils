(function () {
  'use strict';

  angular.module('rdelhommer.ng.directives')
    .directive('contenteditable', contenteditable);

  function contenteditable() {
    return {
      restrict: 'A',
      require: '?ngModel',
      scope: {
        placeholder: '@',
        showPlaceholder: '@'
      },
      link: function(scope, element, attrs, ngModel) {
        if(!ngModel) return;

        ngModel.$render = render;

        element.on('focus', () => {
          if (!scope.showPlaceholder) return;

          // Remove the placeholder if we're showing it
          // ngModel value needs to be set first
          ngModel.$setViewValue('');
          element.html('');
          scope.showPlaceholder = false;
          element.removeClass('input-chat-placeholder');
        });

        element.on('blur keyup change', (e) => {
          read();

          // Show the placeholder if blurring and ngModel is empty 
          if (e.type === 'blur' && ngModel.$viewValue === '') {
            element.html(scope.placeholder);
            scope.showPlaceholder = true;
            element.addClass('input-chat-placeholder');
          }
        });

        // Set the initial html value to be the placeholder
        // ngModel value needs to be set first
        ngModel.$setViewValue('');
        element.html(scope.placeholder);
        scope.showPlaceholder = true;
        element.addClass('input-chat-placeholder');

        function render() {
          if (!ngModel.$viewValue || ngModel.$viewValue === '') {
            element.html(scope.placeholder);
            scope.showPlaceholder = true;
            element.addClass('input-chat-placeholder');
          } else {
            element.html(ngModel.$viewValue);
          }
        }

        function read() {
          ngModel.$setViewValue(element.text());
        }
      }
    };
  }
}());
