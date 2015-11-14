'use strict';
angular.module('main')
.service('LocationReporter', function ($log, $resource, $interval, geolocation) {

  $log.log('Hello from your Service: LocationReporter in module main');

  var Location = $resource('/v1/location', {}, {});

  this.report = function() {
    return geolocation.getLocation().then(function(data){
      var loc = new Location({
        accuracy: data.coords.accuracy,
        altitude: data.coords.altitude,
        altitudeAccuracy: data.coords.altitudeAccuracy,
        heading: data.coords.heading,
        latitude: data.coords.latitude,
        longitude: data.coords.longitude,
        speed: data.coords.speed
      });

      $log.log('Synchronizing coordinates', data.coords, loc);
      return loc.$save();
    });
  };
});