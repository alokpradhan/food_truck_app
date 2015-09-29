foodTrucks.controller("mainCtrl", ['$scope', 'Restangular', 'map', 'backend',
                      function($scope, Restangular, map, backend){

$scope.markers = map.getMarkers();

$scope.submitAddress = function(){
  var address = $scope.streetNumber + " " +
                $scope.streetName + ", San Franscisco, CA";

  backend.getFoodTrucks({address: address}).then(function(response){
      map.updateMap(response);
  });
};

$scope.locateMe = function(){
  backend.getFoodTrucks().then(function(response){
      map.updateMap(response);
  });
};

}]);