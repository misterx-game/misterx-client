'use strict';

describe('module: main, service: Location', function() {

  // load the service's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));
  // load ngResource so we can mock $httpBackend
  beforeEach(module('ngResource'));

  // instantiate service and it's dependencies
  var Location, $httpBackend;
  beforeEach(inject(function(_Location_, _$httpBackend_) {
    $httpBackend = _$httpBackend_;
    Location = _Location_;
  }));

  it('should build url from Config.ENV', function() {
    $httpBackend.expectGET('http://localhost:3001/locations')
      .respond({});

    Location.get();
    $httpBackend.flush();
  });

});
