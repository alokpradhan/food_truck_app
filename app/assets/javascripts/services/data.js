foodTrucks.service('data', ['Restangular', function(Restangular){

  obj = {};

  obj.getFoodTrucks = function(location){
    if (location){
      return Restangular.all('food_trucks').getList(location);
    } else {
      return Restangular.all('food_trucks').getList();
    }
  };

  return obj;

}]);