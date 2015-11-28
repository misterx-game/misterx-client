'use strict';
angular.module('main')
.service('MisterX', function($log, poller, Location) {

  var vm = this;

  var locationPoller = poller.get(Location, {
    action: 'query'
  });

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
    }
  };

  this.markers = {};

  locationPoller.promise.then(
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

});
