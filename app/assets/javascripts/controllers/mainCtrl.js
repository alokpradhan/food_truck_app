foodTrucks.controller('mainCtrl', ['$scope', 'Restangular', 'map', 'data', 'user',
                      function($scope, Restangular, map, data, user){

$scope.markers = map.getMarkers();

$scope.submitAddress = function(){
  var address = $scope.streetNumber + " " +
                $scope.streetName + ", San Franscisco, CA";

  data.getFoodTrucks({address: address}).then(function(response){
    checkResponseAndUpdateMap(response);
  });
};

$scope.locateMe = function(){
  var location = user.coordinates();

  if(location.length === 2){
    data.getFoodTrucks({address: JSON.stringify(location)}).then(function(response){
      checkResponseAndUpdateMap(response);
    });
  } else {
    data.getFoodTrucks().then(function(response){
      checkResponseAndUpdateMap(response);
    });
  }
};

var checkResponseAndUpdateMap = function(response){
  if(response[0][0] !== undefined) {map.update(response);}
};

}]);