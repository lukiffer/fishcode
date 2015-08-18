var app = angular.module('cod', [
  'ngRoute',
  'ui.slider'
]);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider.when('/objectives', {
    templateUrl: 'objectives/objectives.html',
    controller: 'ObjectivesController'
  })
  .when('/products', {
    templateUrl: 'products/products.html',
    controller: 'ProductsController'
  })
  .otherwise({
    redirectTo: '/products'
  });
}]);

app.controller('NavController', ['$scope', '$location', function($scope, $location) {
  $scope.getNavClasses = function(item) {
    return {
      active: $location.$$path == ('/' + item)
    };
  };
}]);