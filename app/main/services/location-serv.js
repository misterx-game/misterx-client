'use strict';
angular.module('main')
.service('Location', function ($log, $resource) {

  return $resource('/v1/location', {}, {});

});
