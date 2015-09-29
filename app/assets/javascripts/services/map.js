foodTrucks.service('map', ['backend', '$window',
                  function(backend, $window){

  var obj = {};
  var markers = [];
  var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var labelIndex = 0;
  var userPosition = [];  // [lat, long]

  $window.initMap = function() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.773972, lng: -122.431297},
      zoom: 13
    });
    addClickListener(map);
  };

  var getLocation = (function(){
    navigator.geolocation.getCurrentPosition(function(response){
      userPosition[0] = response.coords.latitude;
      userPosition[1] = response.coords.longitude;
      console.log(userPosition);
    });
  })();

  var addClickListener = function(map){
    google.maps.event.addListener(map, 'click', function(event){
      addMarker(event.latLng, map);
      submitMarker([event.latLng.H, event.latLng.L]);
    });
  };

  var addMarker = function(location, map) {
    var marker = new google.maps.Marker(
      {
        position: location,
        label: "*",
        map: map,
        title: "Selected Location"
      });
    markers.push([marker, undefined, "*"]);
  };

  var addTrucksToMap = function(trucks){
    for (var i = trucks.length - 1; i >= 0; i--) {
      var locations = trucks[i][0].locations[0];
      var latLong = {lat: parseFloat(locations.lat), lng: parseFloat(locations.long)};
      var label = labels[labelIndex++ % labels.length];

      var marker = new google.maps.Marker({
        position: latLong,
        map: map,
        label: label,
        title: trucks[i][0].name
      });
      markers.push([marker, trucks[i][0], label]);
    }
  };

  var clearMarkers = function(){
    for (var i = markers.length - 1; i >= 0; i--) {
      markers[i][0].setMap(null);
    }
    markers.splice(0, markers.length);
  };

  var submitMarker = function(coords){
    var location = JSON.stringify(coords);
    backend.getFoodTrucks({address: location})
    .then(function(response){
      obj.updateMap(response);
    });
  };

  obj.getMarkers = function(){
    return markers;
  };

  obj.updateMap = function(trucks){
    clearMarkers();
    addTrucksToMap(trucks);
  };

  return obj;
}]);