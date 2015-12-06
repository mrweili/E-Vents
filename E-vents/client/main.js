var app = angular.module('app', ['ngRoute', 'ngResource', 'ngMaterial', 'ngMessages']);

app.config(function ($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'views/home.html'
    })
    .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'loginController',
    })
    .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'registerController',
    })
    .when('/createEvent', {
        templateUrl: 'views/register_post.html',
        controller: 'registerPostingController'
    })
    .when('/about', {
        templateUrl: 'views/about.html',
    })
    .when('/event/:id', {
        templateUrl: 'views/event.html',
        controller: 'eventController'
    })
    .when('/myprofile/', {
        templateUrl: 'views/myprofile.html',
        controller: 'myprofileController',

    })
    .when('/user/:username', {
        templateUrl: 'views/profile.html',
        controller: 'profileController',
    })
    .when('/messages', {
      templateUrl: 'views/messages.html',
      controller: 'messagingController'
    })
    .when('/events/:type', {
        templateUrl: 'views/eventslist.html',
        controller: 'alleventsController'
    })
    .when('/admin', {
        templateUrl: 'views/admin/login.html',
        //controller: 'adminloginController',
        display : {navbar : false}
    })
    .otherwise({redirectTo: '/'});
});

app.config(['$httpProvider', function($httpProvider) {

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

app.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    if (next.display == undefined || next.display == true) {
        $rootScope.hideNav = false;
    }
    else{
        $rootScope.hideNav = true;
    }
  });
});
