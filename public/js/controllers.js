'use strict';

/* Controllers */

var webcvControllers = angular.module('webcvControllers', []);

/*
 * CV Controller
 */
webcvControllers.controller('CVCtrl',
  function($rootScope, $scope, $http) {
    /* Request JSON CV from internal API */
    $http.get('/api/cv').success(function( data ) {
      /* Fill angular $scope with CV information */
      $scope.cv = data;
      /* Dynamically change HTML title field */
      $rootScope.title = data.basics.name;
    });
  }
);


/*
 * Edit CV Controller
 */
webcvControllers.controller('EditCVCtrl',
  function($rootScope, $scope, $http) {
    /* Request JSON CV from internal API */
    $http.get('/api/cv').success(function( data ) {
      /* Fill angular $scope with CV information */
      $scope.cv = data;
      /* Dynamically change HTML title field */
      $rootScope.title = data.basics.name;
    });

    /* TODO showing scope for now  */
    $('#save').click(function() {
      console.log($scope);
    });

    /* Add skill dynamically */
    $scope.addSkill = function() {
      $scope.cv.skills.push({ name: "", level: "", keywords: [""]});
    }

    /* Delete skill dynamically */
    $scope.deleteSkill = function(index) {
      $scope.cv.skills.splice(index, 1);
    }

    /* Add skill keyword dynamically */
    $scope.addSkillKeyword = function(skill_idx) {
      $scope.cv.skills[skill_idx].keywords.push("");
    }

    /* Delete skill keyword dynamically */
    $scope.deleteSkillKeyword = function(skill_idx, keyword_idx) {
      $scope.cv.skills[skill_idx].keywords.splice(keyword_idx, 1);
    }
  }
);
