'use strict';

describe('module: main, controller: StartCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller and mock
  var StartCtrl, mockState, mockIonicHistory;
  beforeEach(function() {
    module(function($provide) {
      $provide.service('$state', function() {
        this.go = jasmine.createSpy('go');
      });
      $provide.service('$ionicHistory', function() {
        this.nextViewOptions = jasmine.createSpy('nextViewOptions');
      });
    });
    module('main');
  });
  beforeEach(inject(function ($controller, $state, $ionicHistory) {
    mockState = $state;
    mockIonicHistory = $ionicHistory;
    StartCtrl = $controller('StartCtrl');
  }));

  it('should go to login when login() is called', function() {
    StartCtrl.login();

    expect(mockState.go).toHaveBeenCalledWith('login');
  });

  it('should reset the history when login() is called', function() {
    StartCtrl.login();

    expect(mockIonicHistory.nextViewOptions).toHaveBeenCalledWith({historyRoot: true});
  });

});
