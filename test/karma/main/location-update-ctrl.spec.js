'use strict';

describe('module: main, controller: LocationUpdateCtrl', function() {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var LocationUpdateCtrl, $q, $log, mockInterval, mockLocalStorage, mockLocationReporter;

  beforeEach(function() {
    module(function($provide) {
      $provide.service('$localStorage', function() {
        this.$default = jasmine.createSpy('$localStorage.$default').and.returnValue({updateLocation: true});
      });
      $provide.service('LocationReporter', function() {
        this.report = function() {};
      });
    });
  });

  beforeEach(inject(function($controller, $interval, $localStorage, _$q_, _$log_, LocationReporter) {
    spyOn($interval, 'cancel').and.callThrough();

    $q = _$q_;
    $log = _$log_;
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

  it('should call report when enough time has passed', function() {
    spyOn(mockLocationReporter, 'report').and.callFake(function() {
      var deferred = $q.defer();
      deferred.resolve();
      return deferred.promise;
    });

    mockInterval.flush(15000);

    expect(mockLocationReporter.report).toHaveBeenCalled();
  });

  it('should report pending as true when data is being sent', function() {
    spyOn(mockLocationReporter, 'report').and.callFake(function() {
      var deferred = $q.defer();
      setTimeout(function() {
        deferred.resolve();
      }, 500);
      return deferred.promise;
    });

    mockInterval.flush(15000);

    expect(LocationUpdateCtrl.pending).toBe(true);
  });

  it('should report pending as false when everything is synced', function() {
    spyOn(mockLocationReporter, 'report').and.callFake(function() {
      var deferred = $q.defer();
      deferred.resolve();
      return deferred.promise;
    });

    mockInterval.flush(15001);

    expect(LocationUpdateCtrl.pending).toBe(false);
  });

  it('should log success', function() {
    spyOn(mockLocationReporter, 'report').and.callFake(function() {
      var deferred = $q.defer();
      deferred.resolve();
      return deferred.promise;
    });
    spyOn($log, 'log');

    mockInterval.flush(15000);

    expect($log.log).toHaveBeenCalledWith('Location synced successfully.');
  });

  it('should log failure', function() {
    spyOn(mockLocationReporter, 'report').and.callFake(function() {
      var deferred = $q.defer();
      deferred.reject();
      return deferred.promise;
    });
    spyOn($log, 'error');

    mockInterval.flush(15000);

    expect($log.error).toHaveBeenCalledWith('Failed to sync location.');
  });

  it('should expose location reporters position', function() {
    expect(LocationUpdateCtrl.position).toEqual(mockLocationReporter.position);
  });

});
