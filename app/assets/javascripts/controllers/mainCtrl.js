foodTrucks.controller("mainCtrl", ['$scope', 'Restangular', function($scope, Restangular){

// Set up Map

var map;
var locatonMarker;
var markers = [];


window.initMap = function() {
  console.log("callback running")
  map = new google.maps.Map(document.getElementById('map'), {
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
    map: map,

  });
  markers.push([marker, undefined])

}

//End Map Set up
//
//
var clearMarkers = function(){
  for (var i = markers.length - 1; i >= 0; i--) {
    markers[i][0].setMap(null)
  };
  markers = [];
}

var populateTable = function(){
  // debugger
  $("#food-table").html("<tr id='header-row'>\
    <th>Label</th>\
    <th>Name</th>\
    <th>Type</th>\
    <th>Items</th>\
    <th>Address</th>\
    <th>Location</th>\
  </tr>")
  $("#header-row").after(buildString())
}

var buildString = function(){
  $scope.trucks = markers[1]
  var table = ""
  for (var i = 0; i < markers.length; i++) {
    var truck = markers[i][1]
    var str =
    "<tr><td>"+markers[i][2]+"</td>"+
    "<td>"+truck.name+"</td>"+
    "<td>"+truck.facility+"</td>"+
    "<td>"+truck.food_items+"</td>"+
    "<td>"+truck.locations[0].address+"</td>"+
    "<td>"+truck.locations[0].description+"</td>"+"</tr>";
    table += str;

  };
  return table;
}


var getFoodTrucks = function(location){
  clearMarkers();
  if (location){
  var promise = Restangular.all('food_trucks').getList(location)
  } else {
  var promise = Restangular.all('food_trucks').getList()
  }

  var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var labelIndex = 0;
  promise.then(function(response){
    console.log(response.length)
    for (var i = response.length - 1; i >= 0; i--) {
      // console.log(response[i][0])

      var locations = response[i][0].locations[0]
      var latLong = {lat: parseFloat(locations.lat), lng: parseFloat(locations.long)}
      var label = labels[labelIndex++ % labels.length]
      var marker = new google.maps.Marker({
        position: latLong,
        map: map,
        label: label,
        title: response[i][0].name
      });

      markers.push([marker, response[i][0], label])

      // debugger
    };
    populateTable();
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