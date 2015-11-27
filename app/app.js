'use strict';
angular.module('MisterX', [
  // load your modules here
  'main', // starting with the main module
  'ngResource',
  'ngStorage',
  'nemLogging',
  'ui-leaflet',
  'geolocation',
  'emguo.poller',
  'angular-jwt',
  'satellizer'
])
.config(function Config($httpProvider, $authProvider, jwtInterceptorProvider, Config) {
  $authProvider.github({
    url: Config.ENV.SERVER_URL + '/auth/github',
    clientId: Config.ENV.GITHUB_CLIENT_ID
  });
  jwtInterceptorProvider.tokenGetter = ['$localStorage', function() {
    return localStorage.getItem('satellizer_token');
  }];

  $httpProvider.interceptors.push('jwtInterceptor');
});
