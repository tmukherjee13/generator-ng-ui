(function() {
    'use strict';
    angular.module('app').controller('profileSettingCtrl', ['$scope', '$http', '$state', 'UserService', '$sessionStorage', 'user', function($scope, $http, $state, UserService, $sessionStorage, user) {
        $scope.user = user;
        $scope.save = function() {
            UserService.save($scope.user);
        };
    }]);
})();