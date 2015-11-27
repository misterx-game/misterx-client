'use strict';
angular.module('main')
.controller('LogoutCtrl', function($log, $state, $ionicHistory, $ionicPopup) {

  this.logout = function() {
    $ionicPopup.confirm({
      title: 'Log out',
      template: 'Are you sure you want to log out?'
    }).then(function(res) {
      if (res) {
        $log.log('Logged out user.');
        localStorage.removeItem('satellizer_token');
        $ionicHistory.nextViewOptions({
          historyRoot: true
        });
        $state.go('start');
      }
    });
  };

});
