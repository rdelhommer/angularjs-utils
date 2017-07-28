// Entry point - Register angular modules
(function () {
  'use strict';

  angular.module('rdelhommer.ng.directives',[]);
  angular.module('rdelhommer.ng.services',['rdelhommer.ng.core']);
  angular.module('rdelhommer.ng',['rdelhommer.ng.directives', 'rdelhommer.ng.services']);
}());
