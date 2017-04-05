// Config.js
(function () {
  'use strict';
  var app = angular.module('app')
    .config(
        ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
            function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
          app.controller = $controllerProvider.register;
          app.directive = $compileProvider.directive;
          app.filter = $filterProvider.register;
          app.factory = $provide.factory;
          app.service = $provide.service;
          app.constant = $provide.constant;
          app.value = $provide.value;
            }
        ])
    .config(['$translateProvider', '$sessionStorageProvider', '$locationProvider', function ($translateProvider, $sessionStorageProvider, $locationProvider) {
      $translateProvider.useStaticFilesLoader({
        prefix: 'i18n/',
        suffix: '.js'
      });
      $translateProvider.preferredLanguage('en');
      $translateProvider.useLocalStorage();
      $sessionStorageProvider.setKeyPrefix('');
      $locationProvider.html5Mode(false);
    }]);
  <% if(enabledModules.auth) { %>
  app.run(function ($rootScope, $state, $sessionStorage, AuthService) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      if (toState.authenticate && !AuthService.isAuthenticated()) {
        $state.go('access.signin');
        event.preventDefault();
      }
    });
  });
  <% } %>
})();
