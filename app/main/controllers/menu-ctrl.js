'use strict';
angular.module('main')
.controller('MenuCtrl', function ($log, $scope, $interval, LocationReporter) {

  $log.log('Hello from your Controller: MenuCtrl in module main:. This is your controller:', this);

  $scope.locationUpdate = {
    checked: true
  };

  $scope.selfPosition = LocationReporter.position;

  var report = function() {
    if (!$scope.locationUpdate.checked) {
      return;
    }
    LocationReporter.report().then(function() {
      $log.log("Location synced successfully.");
    }).catch(function() {
      $log.error("Failed to sync location.");
    });
  };

  $interval(report, 5000);

  // @todo load user info for display at bottom of sidemenu...

});
