var app;

(function () {
    'use strict';

    // Declare app level module which depends on views, and components
    app = angular.module('App', [
        'ui.router',
        'App.controllers',
        'App.directives',
        'App.services'
    ]);

    angular.module('App.controllers', []);
    angular.module('App.directives', []);
    angular.module('App.services', []);

}());
