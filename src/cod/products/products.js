app.controller('ProductsController', ['$scope', function ($scope) {
  console.log('hello');
  $scope.model = {
    impact: 0,
    risk: 0,
    effort: 0,
    strategic: 0
  };
}]);