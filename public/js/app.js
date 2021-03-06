'use strict';

/* App Module */

var webcvApp = angular.module('webcvApp', [
  'ngRoute',
  'webcvControllers'
]);

webcvApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/cv.html',
        controller: 'CVCtrl'
      }).
      when('/edit', {
        templateUrl: 'partials/edit.html',
        controller: 'EditCVCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
