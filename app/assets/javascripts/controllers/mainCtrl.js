foodTrucks.controller("mainCtrl", ['$scope', 'Restangular', function($scope, Restangular){

$scope.submitAddress = function(){
  // var latLng = {};
  var address = $scope.streetNumber + " "+  $scope.streetName + ", San Franscisco, CA"
  // geocoder = new google.maps.Geocoder();
  // geocoder.geocode({address: address}, function(results, status){
  //   latLng.lat = results[0].geometry.location.H
  //   latLng.lng = results[0].geometry.location.L
  //   console.log(latLng)
  //   var marker = new google.maps.Marker({
  //     position: latLng,
  //     map: map,
  //     title: 'Hello World!'
  //   });

  // })




  Restangular.all('food_trucks').getList({address: address})

  .then(function(response){
    console.log(response.length)
    for (var i = response.length - 1; i >= 0; i--) {
      console.log(response[i][0])

      var locations = response[i][0].locations[0]
      var latLong = {lat: parseFloat(locations.lat), lng: parseFloat(locations.long)}
     var marker = new google.maps.Marker({
        position: latLong,
        map: map,
        title: response[i][0].name
      });
    };
  }, function(error){
    console.log(error)
  })

}

}])