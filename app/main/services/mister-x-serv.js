'use strict';
angular.module('main')
.service('MisterX', function ($log, $localStorage, Location) {

  $log.log('Hello from your Service: MisterX in module main');

  var $storage = $localStorage.$default({
    markers: {}
  });

  this.load = function () {
    Location.get(
      function (data) {
        $log.log('Got locations successfully.');
        angular.extend($storage.markers, data);
      },
      function () {
        $log.error('Failed to get locations.');
      }
    );
  };

});
