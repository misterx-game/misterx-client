'use strict';

describe('module: main, controller: StartCtrl', function() {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller and mock
  var StartCtrl, mockAuth, mockState, mockIonicHistory, $scope, $rootScope;
  beforeEach(function() {
    module(function($provide) {
      $provide.service('$auth', function() {
        this.isAuthenticated = function() {};
      });
      $provide.service('$state', function() {
        this.go = jasmine.createSpy('go');
      });
      $provide.service('$ionicHistory', function() {
        this.nextViewOptions = jasmine.createSpy('nextViewOptions');
      });
    });
    module('main');
  });
  beforeEach(inject(function($injector, $controller, $auth, $state, $ionicHistory) {
    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();

    mockAuth = $auth;
    mockState = $state;
    mockIonicHistory = $ionicHistory;
    StartCtrl = $controller('StartCtrl', {$scope: $scope});
  }));

  it('should go to login when login() is called', function() {
    StartCtrl.login();

    expect(mockState.go).toHaveBeenCalledWith('login');
  });

  it('should reset the history when login() is called', function() {
    StartCtrl.login();

    expect(mockIonicHistory.nextViewOptions).toHaveBeenCalledWith({historyRoot: true});
  });

  it('should go to map page if the user is already authenticated', function() {
    spyOn(mockAuth, 'isAuthenticated').and.returnValue(true);
    $rootScope.$broadcast('$ionicView.beforeEnter');

    expect(mockState.go).toHaveBeenCalledWith('main.map');
  });

  it('should do nothing if the user is not authenticated', function() {
    spyOn(mockAuth, 'isAuthenticated').and.returnValue(false);
    $rootScope.$broadcast('$ionicView.beforeEnter');

    expect(mockState.go).not.toHaveBeenCalled();
  });

});
