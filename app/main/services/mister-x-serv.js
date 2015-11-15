'use strict';
angular.module('main')
.service('MisterX', function ($log, $localStorage, Location) {

  $log.log('Hello from your Service: MisterX in module main');

  var $storage = $localStorage.$default({
    markers: {}
  });

  this.positions = $storage.mrxPositions;

});
