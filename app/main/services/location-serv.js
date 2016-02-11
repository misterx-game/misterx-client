'use strict';
angular.module('main')
.factory('Location', function($resource, Config) {

  return $resource(
    Config.ENV.SERVER_URL + '/locations/:_id',
    {_id: '@id'},
    {
      'update': {
        method: 'PUT'
      },
    }
  );

});
