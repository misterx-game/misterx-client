'use strict';
angular.module('main')
.controller('MenuCtrl', function ($log, $scope, $interval, $localStorage, LocationReporter) {

  // persist the decision to send data in localstorage
  $scope.$storage = $localStorage.$default({
    updateLocation: true
  });

  // view state data
  $scope.locationUpdate = {
    pending: false
  };
  $scope.selfPosition = LocationReporter.position;

  // method for sending data to backend
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

  // regularly send position data to backend
  if (
    $scope.$storage.updateLocation &&
    LocationReporter.position.lat === 0 &&
    LocationReporter.position.lon === 0) {

    report();
  }
  $interval(report, 15000);

  // @todo load user info for display at bottom of sidemenu...

});
