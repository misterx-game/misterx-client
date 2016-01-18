'use strict';
angular.module('main')
.factory('Games', function($resource, Config) {

  return $resource(Config.ENV.SERVER_URL + '/games', {}, {});

});
