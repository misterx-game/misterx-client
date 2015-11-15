'use strict';
angular.module('main')
.service('MisterX', function ($log, $localStorage, poller, Location) {

  $log.log('Hello from your Service: MisterX in module main');

  var $storage = $localStorage.$default({
    markers: {}
  });

  var locationPoller = poller.get(Location, {
    action: 'query'
  });

  locationPoller.promise.then(
    null,
    null,
    function (data) {
      $log.log('Got locations successfully.');
      angular.extend($storage.markers, data);
    }
  );

});
