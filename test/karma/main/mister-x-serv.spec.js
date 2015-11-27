'use strict';

describe('module: main, service: MisterX', function () {

  // load the service's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate service
  var MisterX;
  beforeEach(inject(function (_MisterX_) {
    MisterX = _MisterX_;
  }));

  it('should do something');

});
