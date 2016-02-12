'use strict';
angular.module('main')
 .controller('RoleCtrl', function($log, $state, $ionicHistory, $localStorage) {

   // show list of active games
   this.roles = ['Player', 'Agent'];

   this.saveRole = function(role) {
     $ionicHistory.nextViewOptions({
       historyRoot: true
     });
     $localStorage.role = role;
     $state.go('main.map');
   };

 });
