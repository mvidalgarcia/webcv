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
  function($rootScope, $scope, $http, $location) {
    /* Request JSON CV from internal API */
    $http.get('/api/cv').success(function( data ) {
      /* Fill angular $scope with CV information */
      $scope.cv = data;
      /* Dynamically change HTML title field */
      $rootScope.title = data.basics.name;
    });

    /* Save changes made in $scope in database  */
    $scope.saveCV = function() {
      /* PUT request to store changes made on CV */
      $http.put('/api/save', $scope.cv)
      .then(
        function(response){
         // success callback
         console.log(response);
         /* Go to CV index page to show the changes */
         $location.path( "/" );
        },
        function(response){
         // failure callback
         console.log(response);
        }
      );
    }

    /* Load JSON file CV in database */
    $scope.loadJSON = function() {
      $http.get('/api/load').success(function( res ) {
        console.log(res);
        /* Go to CV index page to show the changes */
        $location.path( "/" );
      });
    }

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

    /* Add experience dynamically */
    $scope.addExperience = function() {
      $scope.cv.work.push({company: "", position: "", website: "", startDate: "",
       endDate: "", summary: "", highlights: [""]});
    }

    /* Delete experience dynamically */
    $scope.deleteExperience = function(index) {
      $scope.cv.work.splice(index, 1);
    }

    /* Add experience highlight dynamically */
    $scope.addExpHighlight = function(exp_idx) {
      $scope.cv.work[exp_idx].highlights.push("");
    }

    /* Delete experience highlight dynamically */
    $scope.deleteExpHighlight = function(exp_idx, hl_idx) {
      $scope.cv.work[exp_idx].highlights.splice(hl_idx, 1);
    }

    /* Add volunteering dynamically */
    $scope.addVolunteering = function() {
      $scope.cv.volunteer.push({organization: "", position: "", website: "", startDate: "",
       endDate: "", summary: "", highlights: [""]});
    }

    /* Delete volunteering dynamically */
    $scope.deleteVolunteering = function(index) {
      $scope.cv.volunteer.splice(index, 1);
    }

    /* Add volunteering highlight dynamically */
    $scope.addVolHighlight = function(vol_idx) {
      $scope.cv.volunteer[vol_idx].highlights.push("");
    }

    /* Delete volunteering highlight dynamically */
    $scope.deleteVolHighlight = function(vol_idx, hl_idx) {
      $scope.cv.volunteer[vol_idx].highlights.splice(hl_idx, 1);
    }

    /* Add education dynamically */
    $scope.addEducation = function() {
      $scope.cv.education.push({institution: "", area: "", studyType: "", startDate: "",
      endDate: "", gpa: "", courses: [""]});
    }

    /* Delete education dynamically */
    $scope.deleteEducation = function(index) {
      $scope.cv.education.splice(index, 1);
    }

    /* Add education course dynamically */
    $scope.addEduCourse = function(edu_idx) {
      $scope.cv.education[edu_idx].courses.push("");
    }

    /* Delete education course dynamically */
    $scope.deleteEduCourse = function(edu_idx, hl_idx) {
      $scope.cv.education[edu_idx].courses.splice(hl_idx, 1);
    }

    /* Add award dynamically */
    $scope.addAward = function() {
      $scope.cv.awards.push({title: "", date: "", awarder: "",summary: ""});
    }

    /* Delete award dynamically */
    $scope.deleteAward = function(index) {
      $scope.cv.awards.splice(index, 1);
    }

    /* Add publication dynamically */
    $scope.addPublication = function() {
      $scope.cv.publications.push({name: "", publisher: "", releaseDate: "", website: "", summary: ""});
    }

    /* Delete publication dynamically */
    $scope.deletePublication = function(index) {
      $scope.cv.publications.splice(index, 1);
    }

    /* Add language dynamically */
    $scope.addLanguage = function() {
      $scope.cv.languages.push({name: "", level: ""});
    }

    /* Delete publication dynamically */
    $scope.deleteLanguage = function(index) {
      $scope.cv.languages.splice(index, 1);
    }

    /* Add interest dynamically */
    $scope.addInterest = function() {
      $scope.cv.interests.push({name: "", keywords: [""]});
    }

    /* Delete interest dynamically */
    $scope.deleteInterest = function(index) {
      $scope.cv.interests.splice(index, 1);
    }

    /* Add interest keyword dynamically */
    $scope.addIntKeyword = function(int_idx) {
      $scope.cv.interests[int_idx].keywords.push("");
    }

    /* Delete interest keyword dynamically */
    $scope.deleteIntKeyword = function(int_idx, kw_idx) {
      $scope.cv.interests[int_idx].keywords.splice(kw_idx, 1);
    }

    /* Add reference dynamically */
    $scope.addReference = function() {
      $scope.cv.references.push({name: "", reference: ""});
    }

    /* Delete reference dynamically */
    $scope.deleteReference = function(index) {
      $scope.cv.references.splice(index, 1);
    }

  }
);
