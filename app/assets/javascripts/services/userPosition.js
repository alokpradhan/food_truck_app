foodTrucks.service('user', [function(){

  obj = {};

  var _userPosition = []; // [lat, long]

  var getLocation = (function(){
    navigator.geolocation.getCurrentPosition(function(response){
      _userPosition[0] = response.coords.latitude;
      _userPosition[1] = response.coords.longitude;
    });
  })();

  obj.coordinates = function(){
    return _userPosition;
  };

  return obj;

}]);