'use strict';
angular.module('main')
.controller('LogoutCtrl', function ($log, $scope, $state, $ionicHistory, $ionicPopup) {

  $scope.logout = function () {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Log out',
      template: 'Are you sure you want to log out?'
    });
    confirmPopup.then(function (res) {
      if (res) {
        $log.log('Logging out user');
        localStorage.removeItem('satellizer_token');
        $ionicHistory.nextViewOptions({
          historyRoot: true
        });
        $state.go('^.login');
      }
    });
  };

});
