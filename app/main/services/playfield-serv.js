'use strict';
angular.module('main')
.factory('Playfields', function($resource, Config) {

  return $resource(Config.ENV.SERVER_URL + '/playfields/:_id', { _id: '@id' }, {});

});
