'use strict';
angular.module('main')
.controller('StartCtrl', function($state, $scope, $ionicHistory, $auth) {

  this.login = function() {
    $ionicHistory.nextViewOptions({
      historyRoot: true
    });

    $state.go('login');
  };

  $scope.$on('$ionicView.beforeEnter', function() {
    if ($auth.isAuthenticated()) {
      $state.go('main.games');
    }
  });

});
