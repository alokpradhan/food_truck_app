foodTrucks.service('map', ['backend', '$window', function(backend, $window) {

  var obj = {};
  var _markers = [];
  var _labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var _labelIndex = 0;

  $window.initMap = function() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.773972, lng: -122.431297},
      zoom: 13
    });
    console.log(map);
    _addClickListener(map);
  };

  var _addClickListener = function(map){
    google.maps.event.addListener(map, 'click', function(event){
      _addMarker(event.latLng, map);
      _submitMarker([event.latLng.H, event.latLng.L]);
    });
  };

  var _addMarker = function(location, map) {
    var marker = new google.maps.Marker(
      {
        position: location,
        label: "*",
        map: map,
        title: "Selected Location"
      });
    _markers.push([marker, undefined, "*"]);
  };

  var _addTrucksToMap = function(trucks){
    for (var i = trucks.length - 1; i >= 0; i--) {
      var locations = trucks[i][0].locations[0];
      var latLong = {lat: parseFloat(locations.lat), lng: parseFloat(locations.long)};
      var label = _labels[_labelIndex++ % _labels.length];

      var marker = new google.maps.Marker({
        position: latLong,
        map: map,
        label: label,
        title: trucks[i][0].name
      });
      _markers.push([marker, trucks[i][0], label]);
    }
    console.log(_markers[1]);
  };

  var _clearMarkers = function(){
    for (var i = _markers.length - 1; i >= 0; i--) {
      _markers[i][0].setMap(null);
    }
    _markers.splice(0, _markers.length);
  };

  var _submitMarker = function(coords){
    var location = JSON.stringify(coords);
    backend.getFoodTrucks({address: location})
    .then(function(response){
      obj.updateMap(response);
    });
  };

  obj.getMarkers = function(){
    return _markers;
  };

  obj.updateMap = function(trucks){
    _clearMarkers();
    _addTrucksToMap(trucks);
    map.setCenter(_markers[0][0].position);
    map.setZoom(15);
  };

  return obj;

}]);