'use strict';
angular.module('main')
 .controller('GameCtrl', function($log, $state, Games) {

   // show list of active games
   this.games = Games.query();

  this.joinGame = function(gameId) {
   $state.go('main.map', { game: gameId });
  }

 });
