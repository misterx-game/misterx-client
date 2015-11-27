'use strict';

describe('module: main, controller: LocationUpdateCtrl', function() {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var LocationUpdateCtrl, mockInterval, mockLocalStorage, mockLocationReporter;
  beforeEach(function() {
    module(function($provide) {
      $provide.service('$localStorage', function() {
        this.$default = jasmine.createSpy('$localStorage.$default').and.returnValue({updateLocation: true});
      });
      $provide.service('LocationReporter', function() {
      });
    });
  });
  beforeEach(inject(function($controller, $interval, $localStorage, LocationReporter) {
    spyOn($interval, 'cancel').and.callThrough()

    mockInterval = $interval;
    mockLocalStorage = $localStorage;
    mockLocationReporter = LocationReporter;
    LocationUpdateCtrl = $controller('LocationUpdateCtrl');
  }));

  it('should initialize localStorage', function() {
    expect(mockLocalStorage.$default).toHaveBeenCalledWith({updateLocation: true});
  });

  it('should cancel the timer when stopped', function() {
    var timer = LocationUpdateCtrl.timer;
    LocationUpdateCtrl.toggleUpdate(false);

    expect(mockInterval.cancel).toHaveBeenCalledWith(timer);
    expect(!!LocationUpdateCtrl.timer).toEqual(false);
  });

  it('should create a timer when starting', function() {
    LocationUpdateCtrl.toggleUpdate(false);
    LocationUpdateCtrl.toggleUpdate(true);

    expect(!!LocationUpdateCtrl.timer).toEqual(true);
  });

  it('should show a spinner when data is being sent');

});
