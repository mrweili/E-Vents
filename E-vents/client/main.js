var app = angular.module('app', ['ngRoute', 'ngResource']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/login.html',
      controller: 'loginController'
    })
    .when('/login', {
      templateUrl: 'views/login.html', 
      controller: 'loginController',
    })
    .when('/register', {
      templateUrl: 'views/register.html', 
      controller: 'registerController',
    })
    .when('/events', {
      templateUrl: 'views/posting.html',
      controller: 'postingController'    
    })
    .otherwise({redirectTo: '/'});
});