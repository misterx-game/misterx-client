'use strict';

describe('module: main, service: LocationReporter', function() {

  // load the service's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));
  // load modules so we can mock them
  beforeEach(module('geolocation'));
  beforeEach(module('ngResource'));

  // instantiate service
  var LocationReporter, $q, $log, $httpBackend, geolocation;
  beforeEach(inject(function(_LocationReporter_, _$q_, _$log_, _$httpBackend_, _geolocation_) {
    $q = _$q_;
    $log = _$log_;
    $httpBackend = _$httpBackend_;
    geolocation = _geolocation_;
    LocationReporter = _LocationReporter_;
  }));

  it('should log that it is polling', function() {
    spyOn($log, 'log');

    LocationReporter.report();

    expect($log.log).toHaveBeenCalledWith('Polling device for coordinates.');
  });

  it('should get the location from the browser', function() {
    spyOn(geolocation, 'getLocation').and.callThrough();

    LocationReporter.report();

    expect(geolocation.getLocation).toHaveBeenCalled();
  });

  it('should send the location data to the backend', function() {
    spyOn(geolocation, 'getLocation').and.callFake(function() {
      var deferred = $q.defer();
      deferred.resolve({
        coords: {
          accuracy: 0,
          altitude: 0,
          altitudeAccuracy: 0,
          heading: 0,
          latitude: 0,
          longitude: 0,
          speed: 0
        }
      });
      return deferred.promise;
    });
    var postVal = {
      accuracy: 0,
      altitude: 0,
      altitudeAccuracy: 0,
      heading: 0,
      lat: 0,
      lng: 0,
      speed: 0
    };
    $httpBackend.expectPOST('http://localhost:3001/locations', postVal)
      .respond();

    LocationReporter.report();
    $httpBackend.flush();
  });

});
