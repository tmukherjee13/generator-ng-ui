(function () {
  'use strict';
  angular.module('app')
    .service('AuthService', ['$sessionStorage', function ($sessionStorage) {
      let auth = {
        isAuthenticated() {
          return $sessionStorage.user || false;
        }
      };
      return auth;
	}]);
})();
