'use strict';

describe('module: main, service: Location', function() {

  // load the service's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate service
  var Location;
  beforeEach(inject(function(_Location_) {
    Location = _Location_;
  }));

  it('should build url from Config');
  it('should create a $resource');

});
