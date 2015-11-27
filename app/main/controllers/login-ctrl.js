'use strict';
angular.module('main')
.controller('LoginCtrl', function($log, $auth, $state, $ionicHistory) {

  this.authenticate = function(provider) {
    $auth.authenticate(provider).then(function() {
      $log.log('User logged in.');
      $ionicHistory.nextViewOptions({
        historyRoot: true
      });
      $state.go('main.map', {referer: 'main.map'});
    });
  };

});
