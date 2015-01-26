'use strict';

// Declare app level module which depends on views, and components
angular.module('myAppRename', [
    'ngRoute',
    'myAppRename.controllers',
    'myAppRename.factories',
    'myAppRename.jobsForUserView'
]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/jobsForUserView'});
    }])
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    });



