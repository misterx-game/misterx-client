'use strict';
angular.module('main')
.controller('LocationUpdateCtrl', function($log, $localStorage, $interval, LocationReporter) {

  var vm = this;

  var createTimer = function() {
    return $interval(function() {
      vm.pending = true;
      LocationReporter.report(vm.userLocationId).then(function(data) {
        if (data.$resolved) {
          vm.userLocationId = data._id;
        } else {
          data.$promise.then(function(data) {
            vm.userLocationId = data._id;
          });
        }
        $log.log('Location synced successfully.');
      }).catch(function() {
        $log.error('Failed to sync location.');
      }).finally(function() {
        vm.pending = false;
      });
    }, 15000);
  };

  this.$storage = $localStorage.$default({
    updateLocation: true,
  });
  this.pending = false;
  this.position = LocationReporter.position;

  this.toggleUpdate = function(state) {
    if (state) {
      this.timer = createTimer();
    } else {
      $interval.cancel(this.timer);
      this.timer = null;
    }
  };

  if (this.$storage.updateLocation) {
    this.timer = createTimer();
  }

});
