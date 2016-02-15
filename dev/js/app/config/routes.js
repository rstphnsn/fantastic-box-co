window.app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    'use strict';

    $stateProvider

    .state('home',
        {
            url: '/',
            templateUrl: 'templates/home.html'
        }
    );

    $urlRouterProvider.otherwise('/');

}]);
