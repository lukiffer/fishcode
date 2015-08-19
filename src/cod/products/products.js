app.controller('ProductsController', ['$scope', '$variables', function ($scope, $variables) {

  $scope.model = {
    impact: {
      competitive: 0,
      pipeline: 0,
      revenue: 0,
      operations: 0
    },
    risk: {
      market: 0,
      technical: 0,
      operational: 0,
      financial: 0
    },
    effort: {
      infrastructure: 0,
      development: 0
    },
    strategic: {
      s1: 0,
      s2: 0,
      s3: 0,
      s4: 0
    }
  };

  $scope.getModelStrategyScore = function() {
    return ((($scope.model.strategic.s1 * $variables.weights.strategic.s1) +
        ($scope.model.strategic.s2 * $variables.weights.strategic.s2) +
        ($scope.model.strategic.s3 * $variables.weights.strategic.s3) +
        ($scope.model.strategic.s4 * $variables.weights.strategic.s4)) / 4);
  };

  $scope.getModelImpactScore = function() {
    return ((($scope.model.impact.competitive * $variables.weights.impact.competitive) +
        ($scope.model.impact.pipeline * $variables.weights.impact.pipeline) +
        ($scope.model.impact.revenue * $variables.weights.impact.revenue) +
        ($scope.model.impact.operations * $variables.weights.impact.operations)) / 4);
  };

  $scope.getModelEffortScore = function() {
    return ((($scope.model.effort.infrastructure * $variables.weights.effort.infrastructure) +
        ($scope.model.effort.development * $variables.weights.effort.development)) / 2);
  };

  $scope.getModelRiskScore = function() {
    return ((
      ($scope.model.risk.market * $variables.weights.risk.market) +
      ($scope.model.risk.operational * $variables.weights.risk.operational) +
      ($scope.model.risk.technical * $variables.weights.risk.technical) +
      ($scope.model.risk.financial * $variables.weights.risk.financial)) / 4);
  };

  var computeResult = function() {
    var results = [];

    results.push({
      class: 'danger',
      label: 'R',
      score: $scope.getModelRiskScore()
    });

    results.push({
      class: 'warning',
      label: 'E',
      score: $scope.getModelEffortScore()
    });

    results.push({
      class: 'info',
      label: 'I',
      score: $scope.getModelImpactScore()
    });

    results.push({
      class: 'success',
      label: 'S',
      score: $scope.getModelStrategyScore()
    });

    $scope.results = _.sortBy(results, function (r) {
      return r.score * -1;
    });

    draw();
  };

  $scope.$watch('model', function() {
    computeResult();
  }, true);

  //chart stuff
  var width = 500,
    height = 500,
    radius = Math.min(width, height) / 2,
    innerRadius = 0.3 * radius;

  var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.width; });

  var arc = d3.svg.arc()
    .innerRadius(innerRadius)
    .outerRadius(function (d) { 
      return (radius - innerRadius) * (d.data.score / 100.0) + innerRadius; 
    });

  var outlineArc = d3.svg.arc()
    .innerRadius(innerRadius)
    .outerRadius(radius);

  var draw = function() {

    var data = [{
        id: 'R',
        score: $scope.getModelRiskScore() * 10,
        weight: 25,
        color: '#d9534f',
        label: 'Risks'
      }, {
        id: 'E',
        score: $scope.getModelEffortScore() * 10,
        weight: 25,
        color: '#f0ad4e',
        label: 'Effort'
      }, {
        id: 'I',
        score: $scope.getModelImpactScore() * 10,
        weight: 25,
        color: '#5bc0de',
        label: 'Impact'
     }, {
        id: 'S',
        score: $scope.getModelStrategyScore() * 10,
        weight: 25,
        color: '#5cb85c',
        label: 'Strategic Alignment'
      }];

    $('#chart').empty();

    var svg = d3.select("#chart").append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    data.forEach(function(d) {
      d.color  =  d.color;
      d.weight = +d.weight;
      d.score  = +d.score;
      d.width  = +d.weight;
      d.label  =  d.label;
    });
    
    var path = svg.selectAll(".solidArc")
      .data(pie(data))
      .enter().append("path")
      .attr("fill", function(d) { return d.data.color; })
      .attr("class", "solidArc")
      .attr("stroke", "gray")
      .attr("d", arc);

    var outerPath = svg.selectAll(".outlineArc")
      .data(pie(data))
      .enter().append("path")
      .attr("fill", "none")
      .attr("stroke", "gray")
      .attr("class", "outlineArc")
      .attr("d", outlineArc);  

    var score = 
      data.reduce(function(a, b) {
        return a + (b.score * b.weight); 
      }, 0) / 
      data.reduce(function(a, b) { 
        return a + b.weight; 
      }, 0);

    svg.append("svg:text")
      .attr("class", "fishcode-score")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .text(Math.floor($scope.getModelStrategyScore() + $scope.getModelImpactScore()) + ':' + Math.floor($scope.getModelEffortScore() + $scope.getModelRiskScore()));
  };

}]);