'use strict';
angular.module('main')
.factory('Playfield', function($resource, Config) {

  return $resource(Config.ENV.SERVER_URL + '/playfields/:playfieldId', { playfieldId: '@id' }, {});

});
