'use strict';

describe('module: main, controller: LogoutCtrl', function() {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var LogoutCtrl, $q, $log, $state, $rootScope, $ionicPopup, $ionicHistory;
  beforeEach(function() {
    module(function($provide) {
      $provide.service('$ionicPopup', function() {
        this.confirm = function() {
          var deferred = $q.defer();
          deferred.resolve(true);
          return deferred.promise;
        };
      });
    });
  });

  beforeEach(inject(function($controller, _$q_, _$log_, _$state_, _$rootScope_, _$ionicPopup_, _$ionicHistory_) {
    $q = _$q_;
    $log = _$log_;
    $state = _$state_;
    $rootScope = _$rootScope_;
    $ionicPopup = _$ionicPopup_;
    $ionicHistory = _$ionicHistory_;
    LogoutCtrl = $controller('LogoutCtrl');
  }));

  it('should log that the user logged out', function() {
    spyOn($ionicPopup, 'confirm').and.callThrough();
    spyOn($log, 'log');

    LogoutCtrl.logout();
    $rootScope.$apply();

    expect($ionicPopup.confirm).toHaveBeenCalledWith({title: 'Log out', template: 'Are you sure you want to log out?'});
    expect($log.log).toHaveBeenCalledWith('Logged out user.');
  });

  it('should remove satelizer_token from localStorage', function() {
    spyOn(localStorage, 'removeItem');

    LogoutCtrl.logout();
    $rootScope.$apply();

    expect(localStorage.removeItem).toHaveBeenCalledWith('satellizer_token');
  });

  it('should reset the history', function() {
    spyOn($ionicHistory, 'nextViewOptions').and.callThrough();

    LogoutCtrl.logout();
    $rootScope.$apply();

    expect($ionicHistory.nextViewOptions).toHaveBeenCalledWith({historyRoot: true});
  });

  it('should redirect the user to the start page', function() {
    spyOn($state, 'go');

    LogoutCtrl.logout();
    $rootScope.$apply();

    expect($state.go).toHaveBeenCalledWith('start');
  });

});
