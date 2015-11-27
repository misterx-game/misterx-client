'use strict';
angular.module('main')
.controller('StartCtrl', function($state, $ionicHistory) {

  this.login = function() {
    $ionicHistory.nextViewOptions({
      historyRoot: true
    });

    $state.go('login');
  };

});
