'use strict';
angular.module('main')
.service('Location', function ($log, $resource, Config) {

  return $resource(Config.ENV.SERVER_URL + '/locations', {}, {});

});
