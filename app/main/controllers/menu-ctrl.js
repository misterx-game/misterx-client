'use strict';
angular.module('main')
.controller('MenuCtrl', function ($log, $scope, $interval, $localStorage, LocationReporter) {

  $log.log('Hello from your Controller: MenuCtrl in module main:. This is your controller:', this);

  $scope.$storage = $localStorage.$default({
    updateLocation: true
  });

  $scope.locationUpdate = {
    checked: true,
    pending: false
  };

  $scope.selfPosition = LocationReporter.position;

  var report = function () {
    if (!$scope.$storage.updateLocation) {
      return;
    }
    $scope.locationUpdate.pending = true;
    LocationReporter.report().then(function () {
      $log.log('Location synced successfully.');
      $scope.locationUpdate.pending = false;
    }).catch(function () {
      $log.error('Failed to sync location.');
      $scope.locationUpdate.pending = false;
    });
  };

  if (
    $scope.$storage.updateLocation &&
    LocationReporter.position.lat === 0 &&
    LocationReporter.position.lon === 0) {

    report();
  }
  $interval(report, 15000);

  // @todo load user info for display at bottom of sidemenu...

});
