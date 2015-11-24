'use strict';
angular.module('main')
.controller('MenuCtrl', function ($log, $scope, $interval, $localStorage, LocationReporter) {

  var vm = this;

  // persist the decision to send data in localstorage
  $scope.$storage = $localStorage.$default({
    updateLocation: true,
    markers: {}
  });

  // view state data
  this.locationUpdate = {
    pending: false
  };
  $scope.$storage.markers.selfPosition = LocationReporter.position;

  // method for sending data to backend
  var report = function () {
    if (!$scope.$storage.updateLocation) {
      return;
    }
    vm.locationUpdate.pending = true;
    LocationReporter.report().then(function () {
      $log.log('Location synced successfully.');
      vm.locationUpdate.pending = false;
    }).catch(function () {
      $log.error('Failed to sync location.');
      vm.locationUpdate.pending = false;
    }).finally(function () {
      $scope.$storage.markers.selfPosition = {
        lat: LocationReporter.position.lat,
        lng: LocationReporter.position.lng
      };
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
