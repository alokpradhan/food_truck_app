foodTrucks.controller("mainCtrl", ['$scope', 'Restangular', function($scope, Restangular){

// Set up Map

var map;
var locatonMarker;
window.initMap = function() {
  console.log("callback running")
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.773972, lng: -122.431297},
    zoom: 13
  });
  // Add listener to check for click
  google.maps.event.addListener(map, 'click', function(event) {
    addMarker(event.latLng, map);
    locationMarker = [event.latLng.H, event.latLng.L]
    submitCoords(locationMarker);
  });
}

function addMarker(location, map) {
  // Add the marker at the clicked location, and add the next-available label
  // from the array of alphabetical characters.
  var marker = new google.maps.Marker({
    position: location,
    label: "*",
    map: map
  });

}

//End Map Set up
//
var submitCoords = function(coords){
  console.log("coords are", coords)
  Restangular.all('food_trucks').getList({address: JSON.stringify(coords)})

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


$scope.submitAddress = function(){
  var address = $scope.streetNumber + " "+  $scope.streetName + ", San Franscisco, CA"

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




$scope.locateMe = function(){

  Restangular.all('food_trucks').getList()

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