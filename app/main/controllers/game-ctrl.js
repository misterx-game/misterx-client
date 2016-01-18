'use strict';
angular.module('main')
 .controller('GameCtrl', function($log, $state, Games) {

   // show list of active games
   this.games = Games.query();

 });
