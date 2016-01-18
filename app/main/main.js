'use strict';
angular.module('main', [
  'ionic',
  'ngCordova',
  'ui.router',
  // TODO: load other modules selected during generation
])
.config(function($stateProvider, $urlRouterProvider) {

  // ROUTING with ui.router

  $urlRouterProvider.otherwise('/');

  $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
    // start page
    .state('start', {
      url: '/',
      templateUrl: 'main/templates/start.html',
      controller: 'StartCtrl as ctrl'
    })
    // login form route
    .state('login', {
      url: '/login',
      templateUrl: 'main/templates/login.html',
      controller: 'LoginCtrl as ctrl',
      resolve: {
        skipIfLoggedIn: skipIfLoggedIn
      }
    })
    // main view with sidemenu routes
    .state('main', {
      url: '/main',
      abstract: true,
      templateUrl: 'main/templates/menu.html',
      //controller: 'MenuCtrl as menu'
    })

      .state('main.map', {
        url: '/map',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/map.html',
            controller: 'MapCtrl as ctrl'
          }
        }
      })
      .state('main.games', {
        url: '/games',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/game-list.html',
            controller: 'GameCtrl as ctrl'
          }
        }
      })
      .state('main.list', {
        url: '/list',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/list.html',
            // controller: '<someCtrl> as ctrl'
          }
        }
      })
      .state('main.listDetail', {
        url: '/list/detail',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/list-detail.html',
            // controller: '<someCtrl> as ctrl'
          }
        }
      })
      .state('main.debug', {
        url: '/debug',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/debug.html',
            controller: 'DebugCtrl as ctrl'
          }
        }
      });

  function skipIfLoggedIn($q, $auth) {
    var deferred = $q.defer();
    if ($auth.isAuthenticated()) {
      deferred.reject();
    } else {
      deferred.resolve();
    }
    return deferred.promise;
  }
});
