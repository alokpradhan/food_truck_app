foodTrucks.controller("mainCtrl", ['$scope', 'Restangular', 'map', function($scope, Restangular, map){



$scope.submitAddress = function(){
  var address = $scope.streetNumber + " "+  $scope.streetName + ", San Franscisco, CA";
  map.getFoodTrucks({address: address});

}


$scope.locateMe = function(){
  map.getFoodTrucks();
}

}])