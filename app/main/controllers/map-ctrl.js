'use strict';
angular.module('main')
.controller('MapCtrl', function ($log, $scope, $state, $ionicSideMenuDelegate, LocationReporter) {

  $log.log('Hello from your Controller: MapCtrl in module main:. This is your controller:', this);

  $ionicSideMenuDelegate.canDragContent(false);
  $scope.$on('$locationChangeSuccess', function( event ) {
    $ionicSideMenuDelegate.canDragContent($state.current.url !== '/map');
  });

  $scope.center = {
    lat: 0,
    lon: 0,
    autodiscover: true
  };

  $scope.selfPosition = LocationReporter.position;

});
