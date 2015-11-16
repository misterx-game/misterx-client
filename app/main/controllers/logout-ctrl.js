'use strict';
angular.module('main')
.controller('LogoutCtrl', function ($log, $scope, $state, $ionicHistory) {

  $scope.logout = function() {
    $log.log('Logging out user');
    localStorage.removeItem('satellizer_token');
    $ionicHistory.nextViewOptions({
      historyRoot: true
    });
    $state.go('^.login');
  };

});
