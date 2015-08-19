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

app.factory('$variables', function() {
  return {
    weights: {
      impact: {
        competitive: 1.0000,
        pipeline: 1.0000,
        revenue: 1.0000,
        operations: 1.0000
      },
      effort: {
        infrastructure: 1.0000,
        development: 1.0000
      },
      risk: {
        market: 1.0000,
        technical: 1.0000,
        operational: 1.0000,
        financial: 1.0000
      },
      strategic: {
        s1: 1.0000,
        s2: 1.0000,
        s3: 1.0000,
        s4: 1.0000
      }
    }
  };
});