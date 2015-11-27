'use strict';
angular.module('main')
.controller('MenuCtrl', function($log, $scope, $interval, $localStorage) {

  // persist the decision to send data in localstorage
  $scope.$storage = $localStorage.$default({
    markers: {}
  });

  // @todo load user info for display at bottom of sidemenu...

});
