let myApp = angular.module('myApp', ['ngRoute', 'ngFileUpload']);

/// Routes ///
myApp.config(['$routeProvider', function($routeProvider) {
  console.log('myApp -- config')
  $routeProvider
    .when('/', {
      templateUrl: '/views/csvUpload.html',
      controller: 'CSVController as vm',
    })
}]);
