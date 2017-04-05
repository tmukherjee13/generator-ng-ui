(function () {
  'use strict';
  angular.module('app')
    .controller('signinCtrl', ['$scope', '$http', '$state', '$sessionStorage', function ($scope, $http, $state, $sessionStorage) {
      $scope.user = {};
      $scope.authError = null;
      $scope.login = function () {
        $scope.authError = null;
        // Try to login
        $http.get('api/login', {
            email: $scope.user.email,
            password: $scope.user.password
          })
          .then(function (response) {
            if (!response.data.user) {
              $scope.authError = 'Email or Password not right';
            } else {
              $sessionStorage.user = response.data.user;
              $state.go('app.dashboard');
            }
          }, function (x) {
            $scope.authError = 'Server Error';
          });
      };
  }]);
})();
