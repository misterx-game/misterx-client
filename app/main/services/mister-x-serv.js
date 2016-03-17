'use strict';
angular.module('main')
.service('MisterX', function($log, $localStorage, poller, Location, Playingcard) {

  var vm = this;

  var locationPoller = function() {
    return poller.get(Location, {
      action: 'query',
      argumentsArray: [
        {
          query: { game: $localStorage.gameId },
        }
      ]
    });
  };

  var playingcardPoller = function() {
    return poller.get(Playingcard, {
      action: 'query'//,
      //argumentsArray: [
       // {
       //   query: { game: $localStorage.gameId },
       // }
     // ]
    });
  };


  var iconMap = {
    player: {
      type: 'div',
      iconSize: [0, 0],
      iconAnchor: [14, 40],
      html: '<i class="icon ion-person mrx-map-icon mrx-map-icon-player"></i>'
    },
    agent: {
      type: 'div',
      iconSize: [0, 0],
      iconAnchor: [14, 40],
      html: '<i class="icon ion-person mrx-map-icon mrx-map-icon-agent"></i>'
    },
    playingcard: {
      type: 'div',
      iconSize: [32, 32]
    }
  };

  this.markers = {};

  this.startPoller = function() {
    locationPoller().promise.then(
      null,
      null,
      function(data) {
        $log.log('Got locations successfully.');
        angular.extend(
          vm.markers,
          data.filter(function(obj) {
            return '_id' in obj;
          }).reduce(function(arr, obj) {
            obj.icon = iconMap[obj.group] || undefined;
            arr[obj._id] = obj;
            return arr;
          }, {})
        );
      }
    );
  };
  this.markers = {};
  this.startPoller = function() {
    playingcardPoller().promise.then(
      null,
      null,
      function(data) {
        $log.log('Got locations successfully.');
        angular.extend(
          vm.markers,
          data.filter(function(obj) {
            return '_id' in obj;
          }).reduce(function(arr, obj) {
            obj.icon = iconMap[obj] || undefined;
            arr[obj._id] = obj;
            return arr;
          }, {})
        );
      }
    );
  };

  this.stopPoller = function() {
    locationPoller().remove();
    playingcardPoller().remove();
    vm.markers = {};
  };

});
