'use strict';
angular.module('main')
.controller('LoginCtrl', function ($log, $scope, $auth, $localStorage, $state, $ionicHistory) {

  $log.log('Hello from your Controller: LoginCtrl in module main:. This is your controller:', this);

  $scope.authenticate = function(provider) {
    $auth.authenticate(provider).then(function(response) {
      $ionicHistory.nextViewOptions({
        historyRoot: true
      });
      $state.go('main.map', {referer: 'main.map'});
    });
  };

});
