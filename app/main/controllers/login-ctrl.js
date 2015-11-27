'use strict';
angular.module('main')
.controller('LoginCtrl', function($log, $auth, $localStorage, $state, $ionicHistory) {

  $log.log('Hello from your Controller: LoginCtrl in module main:. This is your controller:', this);

  this.authenticate = function(provider) {
    $auth.authenticate(provider).then(function() {
      $ionicHistory.nextViewOptions({
        historyRoot: true
      });
      $state.go('main.map', {referer: 'main.map'});
    });
  };

});
