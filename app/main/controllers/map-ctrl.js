'use strict';
angular.module('main')
.controller('MapCtrl', function ($log, $scope, $state, $localStorage, $ionicSideMenuDelegate, LocationReporter, MisterX) {

  // make sure that the map can be navigated without triggering the side-menu drag
  $ionicSideMenuDelegate.canDragContent(false);
  $scope.$on('$locationChangeSuccess', function () {
    $ionicSideMenuDelegate.canDragContent($state.current.url !== '/map');
  });

  // let center of map be set automagically
  $scope.center = {
    lat: 0,
    lon: 0,
    autodiscover: true
  };

  // put positions for marker onto scope
  $scope.selfPosition = LocationReporter.position;
  $scope.$storage = $localStorage;

});
