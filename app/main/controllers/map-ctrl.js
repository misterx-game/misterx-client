'use strict';
angular.module('main')
.controller('MapCtrl', function($log, $scope, $state, $ionicSideMenuDelegate, MisterX, Games) {

  // make sure that the map can be navigated without triggering the side-menu drag
  $ionicSideMenuDelegate.canDragContent(false);
  $scope.$on('$locationChangeSuccess', function() {
    $ionicSideMenuDelegate.canDragContent(!$state.includes('main.map'));
  });

  this.game = Games.get({ gameId: $state.params.game });

  // expose misterx markers on map
  this.markers = MisterX.markers;

  // configure the map
  angular.extend(this, {
    defaults: {
      zoom: 8,
      zoomControlPosition: 'topleft',
      trackResize: false
    },
    // let center of map be set automagically
    center: {
      autoDiscover: true
    },
    controls: {
      scale: {
        imperial: false
      },
      minimap: {
        type: 'minimap',
        layer: {
          name: 'OpenStreetMap',
          url: 'http://a.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png',
          type: 'xyz'
        },
        toggleDisplay: true
      }
    },
    layers: {
      baselayers: {
        switzerland: {
          name: 'OpenStreetMap (CH)',
          url: 'http://tile.osm.ch/switzerland/{z}/{x}/{y}.png',
          type: 'xyz'
        },
        osm: {
          name: 'OpenStreetMap',
          url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          type: 'xyz'
        },
        transport: {
          name: 'Transport Map',
          url: 'http://a.tile2.opencyclemap.org/transport/{z}/{x}/{y}.png',
          type: 'xyz'
        },
        hikenbike: {
          name: 'Hike&Bike',
          url: 'http://toolserver.org/tiles/hikebike/{z}/{x}/{y}.png',
          type: 'xyz'
        }
      }
    }
  });

});
