foodTrucks.controller("mainCtrl", ['$scope', 'Restangular', function($scope, Restangular){

$scope.submitAddress = function(){
  var address = $scope.streetNumber + " "+  $scope.streetName + ", San Franscisco, CA"

  Restangular.all('food_trucks').getList({address: address})

  .then(function(response){
    console.log(response)
  }, function(error){
    console.log(error)
  })

}

}])