// Go to next input when Enter is pressed instead of standard functionality
(function () {
  'use strict';

  angular.module('rdelhommer.ng.directives')
    .directive('enterAsTab', enterAsTab);

  function enterAsTab() {
    var directive = {
      link: link
    };

    return directive;

    function link(scope, element, attrs) {
      element.bind("keydown keypress", (event) => {
        if (event.which !== 13) return;

        event.preventDefault();

        var nextInput = element.parent().next().find('input')[0];
        if (!nextInput) {
          nextInput = element.parent().parent().next().find('input')[0];

          if (!nextInput) return;
        }

        nextInput.focus();
      });
    }
  }
}());