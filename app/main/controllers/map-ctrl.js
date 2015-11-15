'use strict';
angular.module('main')
.controller('MapCtrl', function ($log, $scope, $state, $localStorage, $ionicSideMenuDelegate, LocationReporter, MisterX) {

  // make sure that the map can be navigated without triggering the side-menu drag
  $ionicSideMenuDelegate.canDragContent(false);
  $scope.$on('$locationChangeSuccess', function () {
    $ionicSideMenuDelegate.canDragContent($state.current.url !== '/map');
  });

  angular.extend($scope, {
    defaults: {
      zoom: 8,
      zoomControlPosition: 'bottomleft',
      trackResize: false
    },
    // let center of map be set automagically
    center: {
      autoDiscover: true
    },
    controls: {
      scale: {
        position: 'bottomright'
      }
    }
  });

  MisterX.load();

});
