'use strict';
angular.module('main')
.service('LocationReporter', function($log, $state, $interval, geolocation, Location) {

  var vm = this;

  this.state = $state;
  this.position = {
    lat: 0,
    lng: 0
  };

  function saveFromData(loc, data, update) {
    loc.accuracy = data.coords.accuracy;
    loc.altitude = data.coords.altitude;
    loc.altitudeAccuracy = data.coords.altitudeAccuracy;
    loc.heading = data.coords.heading;
    loc.lat = data.coords.latitude;
    loc.lng = data.coords.longitude;
    loc.speed = data.coords.speed;
    loc.client = loc.client || {};
    loc.client.time = new Date();
    loc.game = vm.state.params.game;

    vm.position.lat = loc.lat;
    vm.position.lng = loc.lng;

    if (update) {
      return loc.$update({_id: loc._id});
    }
    return loc.$save();
  }

  function updateOrSave(locationId, data) {
    if (!locationId) {
      return saveFromData(new Location(), data);
    }
    return Location.get({_id: locationId}, function(loc) {
      return saveFromData(loc, data, true);
    }, function() {
      return saveFromData(new Location(), data);
    });
  }

  this.report = function(locationId) {
    $log.log('Polling device for coordinates.');
    return geolocation.getLocation().then(function(data) {
      return updateOrSave(locationId, data);
    });
  };
});
