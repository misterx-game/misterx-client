'use strict';
angular.module('main')
.controller('MapCtrl', function ($log, $scope, LocationReporter) {

  $log.log('Hello from your Controller: MapCtrl in module main:. This is your controller:', this);

  $scope.center = {
    lat: 0,
    lon: 0,
    autodiscover: true
  };

  $scope.selfPosition = LocationReporter.position;

});
