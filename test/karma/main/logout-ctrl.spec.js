'use strict';

describe('module: main, controller: LogoutCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var LogoutCtrl;
  beforeEach(inject(function ($controller) {
    LogoutCtrl = $controller('LogoutCtrl');
  }));

  it('should do something', function () {
    expect(!!LogoutCtrl).toBe(true);
  });

});
