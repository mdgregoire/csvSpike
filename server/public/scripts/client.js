let myApp = angular.module('myApp', ['ngRoute', 'ngFileUpload']);

/// Routes ///
myApp.config(['$routeProvider', function($routeProvider) {
  console.log('myApp -- config')
  $routeProvider
    .when('/', {
      templateUrl: '/views/home.html',
      controller: 'CSVController as vm',
    })
    .when('/upload', {
      templateUrl: '/views/csvUpload.html',
      controller: 'CSVController as vm',
    })
    .when('/download', {
      templateUrl: '/views/csvDownload.html',
      controller: 'CSVController as vm',
    })
}]);
