'use strict';

describe('module: main, controller: LoginCtrl', function() {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var LoginCtrl, $q, $log, $auth, $rootScope;
  beforeEach(function() {
    module(function($provide) {
      $provide.service('$auth', function() {
        this.authenticate = function() {
          var deferred = $q.defer();
          deferred.resolve({status: 200});
          return deferred.promise;
        };
      });
    });
    module('main');
  });
  beforeEach(inject(function($controller, _$q_, _$log_, _$auth_, _$rootScope_) {
    $q = _$q_;
    $log = _$log_;
    $auth = _$auth_;
    $rootScope = _$rootScope_;
    LoginCtrl = $controller('LoginCtrl');
  }));

  it('should pass the provider argument to authorize on to $auth', function() {
    spyOn($auth, 'authenticate').and.callThrough();

    LoginCtrl.authenticate('github');

    expect($auth.authenticate).toHaveBeenCalledWith('github');
  });

  it('should redirect to main.map after a successful github auth', function() {
    spyOn($auth, 'authenticate').and.callThrough();
    spyOn($log, 'log');

    LoginCtrl.authenticate('github');
    $rootScope.$apply();

    expect($log.log).toHaveBeenCalledWith('User logged in.');
  });

});
