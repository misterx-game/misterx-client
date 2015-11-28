'use strict';

describe('module: main, service: MisterX', function() {

  // load the service's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));
  // load dependent modules needed for mocking
  beforeEach(module('ngResource'));
  beforeEach(module('emguo.poller'));

  // instantiate service
  var MisterX, $httpBackend;
  beforeEach(inject(function(_MisterX_, _$httpBackend_) {
    $httpBackend = _$httpBackend_;
    MisterX = _MisterX_;
  }));

  it('should expose markers sent by the backend', function() {
    $httpBackend.expectGET('http://localhost:3001/locations')
      .respond([
        {
          _id: 1234,
          lat: 0,
          lng: 0
        }
      ]);

    $httpBackend.flush();

    expect(Object.keys(MisterX.markers).length).toBe(1);
    expect(MisterX.markers['1234']['_id']).toBe(1234);
    expect(MisterX.markers['1234']['lat']).toBe(0);
    expect(MisterX.markers['1234']['lng']).toBe(0);
  });

});
