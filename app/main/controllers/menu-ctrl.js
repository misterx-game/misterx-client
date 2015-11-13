'use strict';
angular.module('main')
.controller('MenuCtrl', ['$scope', '$log', function ($scope, $log) {

  $scope.center = {
    lat: 0,
    lon: 0,
    autodiscover: true
  };

  $log.log('Hello from your Controller: MenuCtrl in module main:. This is your controller:', this);

}]);
