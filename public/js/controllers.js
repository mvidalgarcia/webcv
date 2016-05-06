'use strict';

/* Controllers */

var webcvControllers = angular.module('webcvControllers', []);

webcvControllers.controller('CVCtrl', ['$scope',
  function($scope) {
    $scope.name = 'Marco Vidal García';
  }]);
