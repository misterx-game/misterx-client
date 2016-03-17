'use strict';
angular.module('main')
.factory('Playingcard', function($resource, Config) {

  return $resource(
    Config.ENV.SERVER_URL + '/playingcards/:_id',
    {_id: '@id'},
    {
      'update': {
        method: 'PUT'
      },
    }
  );

});
