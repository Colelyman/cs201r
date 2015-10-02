var familyApp = angular.module('familyApp', []);

familyApp.controller('control', function($scope) {
  $scope.names = [{person:'Uncle Dan,', mother:'Lori Lyman', father:'Ed Lyman,', clear:false}];

  $scope.addNew = function() {
    $scope.names.push({person:$scope.person + ',', mother:$scope.mother, father:$scope.father + ',', clear:false});
    $scope.person = "";
    $scope.father = "";
    $scope.mother = "";
  };

  $scope.remove = function() {
    var oldNames = $scope.names;
    $scope.names = [];
    angular.forEach(oldNames, function(x) {
      if(!x.clear) {
        $scope.names.push(x);
      }
    });
  };
});
