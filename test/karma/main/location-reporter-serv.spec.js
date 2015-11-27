'use strict';

describe('module: main, service: LocationReporter', function() {

  // load the service's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate service
  var LocationReporter;
  beforeEach(inject(function(_LocationReporter_) {
    LocationReporter = _LocationReporter_;
  }));

  it('should do something');

});
