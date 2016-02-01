'use strict';
angular.module('main')
 .controller('GameCtrl', function($log, $state, $ionicHistory, Games) {

   // show list of active games
   this.games = Games.query({query: {start: '<' + (new Date()), end: '>' + (new Date())}});

   this.joinGame = function(gameId) {
     $ionicHistory.nextViewOptions({
       historyRoot: true
     });
     $state.go('main.map', { game: gameId });
   };

 });