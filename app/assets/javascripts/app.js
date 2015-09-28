var foodTrucks = angular.module("foodTrucks", ['ui.router', 'restangular'])


.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/main");

   $stateProvider
      .state('main', {
        url: "/main",
        templateUrl: "templates/main.html",
        controller: 'mainCtrl'
      })
})