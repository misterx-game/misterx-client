'use strict';
angular.module('main')
 .controller('GameCtrl', function($log, $state, $ionicHistory, $localStorage, Games) {

   // show list of active games
   this.games = Games.query({query: {start: '<' + (new Date()), end: '>' + (new Date())}});

   this.saveGame = function(gameId) {
     $localStorage.gameId = gameId;
     $state.go('main.role');
   };

 });
