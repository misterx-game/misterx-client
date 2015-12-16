'use strict';
angular.module('main')
.service('LocationReporter', function($log, $interval, geolocation, Location) {

  var vm = this;

  this.position = {
    lat: 0,
    lng: 0
  };

  this.report = function() {
    $log.log('Polling device for coordinates.');
    return geolocation.getLocation().then(function(data) {
      var loc = new Location({
        accuracy: data.coords.accuracy,
        altitude: data.coords.altitude,
        altitudeAccuracy: data.coords.altitudeAccuracy,
        heading: data.coords.heading,
        lat: data.coords.latitude,
        lng: data.coords.longitude,
        speed: data.coords.speed,
        client: {
          time: new Date()
        }
      });
      vm.position.lat = loc.lat;
      vm.position.lng = loc.lng;

      return loc.$save();
    });
  };
});
