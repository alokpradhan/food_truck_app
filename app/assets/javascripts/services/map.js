foodTrucks.service('map', ['data', '$window', function(data, $window) {

  var obj = {};
  var _markers = [];
  var _labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var _labelIndex = 0;
  var _matchedCount = 1;
  var _searchMarker;

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
      _setUserSearchMarker(event.latLng, map);
      _addUserSearchMarker();
      _submitMarker([event.latLng.H, event.latLng.L]);
    });
  };

  var _setUserSearchMarker = function(location, map) {
    _searchMarker = {
      position: location,
      label: "*",
      map: map,
      title: "Selected Location"
    };
  };

  var _addUserSearchMarker = function() {
    var marker = new google.maps.Marker( _searchMarker );
    _markers.push([ marker, undefined, "*"]);
  };

  var _addTrucksToMap = function(trucks){
    var currentAddresses = [];
    for (var i = trucks.length - 1; i >= 0; i--) {
      var location = trucks[i][0].locations[0];
      var latLong = { lat: parseFloat(parseFloat(location.lat)),
                      lng: parseFloat(parseFloat(location.long))};

      latLong = _scatterMarkers(latLong, currentAddresses, location.address);
      currentAddresses.push(location.address);

      var label = _labels[_labelIndex++ % _labels.length];
      _createTruckMarker(latLong, label, trucks[i][0].name, trucks[i][0]);

    }
  };

  var _createTruckMarker = function(latLong, label, title, truck){
    var marker = new google.maps.Marker({
      position: latLong,
      map: map,
      label: label,
      title: title
    });
    _markers.push([marker, truck, label]);
  };

  var _scatterMarkers = function(latLong, currentAddresses, addressToCheck){
    var matched = false;
    for (var i=0; i < currentAddresses.length; i++){
      if (addressToCheck === currentAddresses[i]) {
        var sign = _matchedCount % 2;
        sign = (sign === 0) ?  -1 : 1;
        latLong.lat += (0.00002 * _matchedCount * sign);
        latLong.lng += (0.00002 * _matchedCount * sign);
        _matchedCount += 1;
        matched = true;
        return latLong;
      }
    }
    if(!matched) { return latLong; }
  };

  var _clearMarkers = function(){
    for (var i = _markers.length - 1; i >= 0; i--) {
      _markers[i][0].setMap(null);
    }
    _markers.splice(0, _markers.length);
    _matchedCount = 1;
  };

  var _submitMarker = function(coords){
    var location = JSON.stringify(coords);
    data.getFoodTrucks({address: location})
    .then(function(response){
      obj.update(response);
    });
  };

  obj.getMarkers = function(){
    return _markers;
  };

  obj.update = function(trucks){
    _clearMarkers();
    _addUserSearchMarker();
    _addTrucksToMap(trucks);
    map.setCenter(_markers[0][0].position);
    map.setZoom(14);
  };

  angular.element(document).ready(function () {
    $window.initMap();
  });

  return obj;

}]);