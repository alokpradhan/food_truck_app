foodTrucks.controller("mainCtrl", ['$scope', 'Restangular', function($scope, Restangular){

// Set up Map

var map;
var locatonMarker;
var markers = [];
window.initMap = function() {
  console.log("callback running")
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.773972, lng: -122.431297},
    zoom: 13
  });
  // Add listener to check for click
  google.maps.event.addListener(map, 'click', function(event) {
    addMarker(event.latLng, map);
    var locationMarker = [event.latLng.H, event.latLng.L]
    console.log("location marker", locationMarker)
    submitMarker(locationMarker);
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
  markers.push(marker)

}

//End Map Set up
//
var getFoodTrucks = function(location){
  console.log("location is", location)
  if (location){
  var promise = Restangular.all('food_trucks').getList(location)
  } else {
  var promise = Restangular.all('food_trucks').getList()
  }


  promise.then(function(response){
    console.log(response.length)
    for (var i = response.length - 1; i >= 0; i--) {
      // console.log(response[i][0])

      var locations = response[i][0].locations[0]
      var latLong = {lat: parseFloat(locations.lat), lng: parseFloat(locations.long)}
      console.log(latLong)
      var marker = new google.maps.Marker({
        position: latLong,
        map: map,
        title: response[i][0].name
      });
      debugger
    };
  }, function(error){
    console.log(error)
  })

}

var submitMarker = function(coords){


  var location = JSON.stringify(coords)
  getFoodTrucks({address: location})
}


$scope.submitAddress = function(){
  var address = $scope.streetNumber + " "+  $scope.streetName + ", San Franscisco, CA";
  var location = {address: address};
  getFoodTrucks(location);

}


$scope.locateMe = function(){
  getFoodTrucks();
}

}])