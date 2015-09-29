foodTrucks.controller('mainCtrl', ['$scope', 'Restangular', 'map', 'backend', 'user',
                      function($scope, Restangular, map, backend, user){

$scope.markers = map.getMarkers();

$scope.submitAddress = function(){
  var address = $scope.streetNumber + " " +
                $scope.streetName + ", San Franscisco, CA";

  backend.getFoodTrucks({address: address}).then(function(response){
      map.updateMap(response);
  });
};

$scope.locateMe = function(){
  var location = user.coordinates();

  if(location.length === 2){
    backend.getFoodTrucks({address: JSON.stringify(location)}).then(function(response){
      console.log(response);
      map.updateMap(response);
    });
  } else {
    backend.getFoodTrucks().then(function(response){
      map.updateMap(response);
    });
  }
};

}]);