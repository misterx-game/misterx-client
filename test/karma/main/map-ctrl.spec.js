'use strict';

describe('module: main, controller: MapCtrl', function() {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var MapCtrl, $rootScope, $scope, $state, $ionicSideMenuDelegate, MisterX;

  beforeEach(function() {
    module(function($provide) {
      $provide.service('MisterX', function() {
      });
    });
  });

  beforeEach(inject(function($controller, _$rootScope_, _$state_, _$ionicSideMenuDelegate_, _MisterX_) {
    $rootScope = _$rootScope_;
    $state = _$state_;
    $ionicSideMenuDelegate = _$ionicSideMenuDelegate_;
    MisterX = _MisterX_;

    $scope = $rootScope.$new();

    MapCtrl = $controller('MapCtrl', {$scope: $scope});
  }));

  it('should disable canDragContent in the main.map state', function() {
    spyOn($ionicSideMenuDelegate, 'canDragContent');
    spyOn($state, 'includes').and.returnValue(true);

    $rootScope.$apply();

    expect($state.includes).toHaveBeenCalledWith('main.map');
    expect($ionicSideMenuDelegate.canDragContent).toHaveBeenCalledWith(false);
  });

  it('should enable canDragContent in states other than main.map state', function() {
    spyOn($ionicSideMenuDelegate, 'canDragContent');
    spyOn($state, 'includes').and.returnValue(false);

    $rootScope.$apply();

    expect($state.includes).toHaveBeenCalledWith('main.map');
    expect($ionicSideMenuDelegate.canDragContent).toHaveBeenCalledWith(true);
  });

  it('should bind MisterX\'s markers to the controller', function() {
    expect(MisterX.markers).toBe(MapCtrl.markers);
  });

});
