'use strict';
angular.module('main')
.service('LocationReporter', function ($log, $interval, geolocation, Location) {

  $log.log('Hello from your Service: LocationReporter in module main');

  var lr = this;

  this.position = {
    lat: 0,
    lng: 0
  };

  this.report = function () {
    return geolocation.getLocation().then(function (data) {
      var loc = new Location({
        accuracy: data.coords.accuracy,
        altitude: data.coords.altitude,
        altitudeAccuracy: data.coords.altitudeAccuracy,
        heading: data.coords.heading,
        latitude: data.coords.latitude,
        longitude: data.coords.longitude,
        speed: data.coords.speed
      });
      lr.position.lat = loc.latitude;
      lr.position.lng = loc.longitude;

      $log.log('Synchronizing coordinates', data.coords);
      return loc.$save();
    });
  };
});
