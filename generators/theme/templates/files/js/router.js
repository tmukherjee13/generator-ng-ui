(function () {
  'use strict';
  angular.module('app')
    .run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
    }
    ])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/dashboard');
      $stateProvider.state('app', {
        abstract: true,
        url: '',
        templateUrl: 'partials/app.html',
        resolve: {}
      })
      .state('app.dashboard', {
        url: '/dashboard',
        templateUrl: 'partials/dashboard.html',
        authenticate: true,
        resolve: {
          deps: ['$ocLazyLoad',
            function ($ocLazyLoad) {
              return $ocLazyLoad.load(['js/controllers/chart.js']);
            }
          ]
        }
      });
      <% if(enabledModules.auth) { %>
      $stateProvider.state('access', {
        url: '/access',
        template: '<div ui-view class="fade-in-right-big smooth"></div>'
      })
      .state('access.signin', {
        url: '/signin',
        templateUrl: 'partials/access/signin.html',
        controller: 'signinCtrl',
        resolve: {
          deps: ['uiLoad', function (uiLoad) {
            return uiLoad.load(['js/controllers/signin.js']);
          }
          ]
        }
      })
      .state('lockme', {
        url: '/lockme',
        templateUrl: 'partials/access/lockme.html'
      })
      .state('access.signup', {
        url: '/signup',
        templateUrl: 'partials/signup.html',
        resolve: {
          deps: ['uiLoad', function (uiLoad) {
            return uiLoad.load(['js/controllers/signup.js']);
          }
          ]
        }
      })
      .state('access.forgotpwd', {
        url: '/forgotpwd',
        templateUrl: 'partials/access/page_forgotpwd.html'
      });
      <% } %>
      $stateProvider.state('access.404', {
        url: '/404',
        templateUrl: 'partials/page_404.html'
      });
    }]);
})();
