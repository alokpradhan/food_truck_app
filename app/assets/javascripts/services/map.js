foodTrucks.service("map", ['Restangular', function(Restangular){

  var obj = {};
  var markers = [];
  var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var labelIndex = 0;

  window.initMap = function() {
    console.log("callback running")
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.773972, lng: -122.431297},
      zoom: 13
    });
    // Add listener to check for click
    google.maps.event.addListener(map, 'click', function(event){
      addMarker(event.latLng, map);
      submitMarker([event.latLng.H, event.latLng.L]);
    });
  }



  var addMarker = function(location, map) {

    var marker = new google.maps.Marker(
      {
        position: location,
        label: "*",
        map: map,
        title: "Selected Location"
      });

    markers.push([marker, undefined, "*"])

  }

  var addTrucksToMap = function(trucks){
    for (var i = trucks.length - 1; i >= 0; i--) {
      // console.log(trucks[i][0])

      var locations = trucks[i][0].locations[0]
      var latLong = {lat: parseFloat(locations.lat), lng: parseFloat(locations.long)}
      var label = labels[labelIndex++ % labels.length]

      var marker = new google.maps.Marker({
        position: latLong,
        map: map,
        label: label,
        title: trucks[i][0].name
      });

      markers.push([marker, trucks[i][0], label])

      // debugger
    };
    populateTable();
  }

  obj.getFoodTrucks = function(location){
    clearMarkers();
    if (location){
    var promise = Restangular.all('food_trucks').getList(location)
    } else {
    var promise = Restangular.all('food_trucks').getList()
    }


    promise.then(function(response){
      addTrucksToMap(response)
    }, function(error){
      console.log(error)
    })

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

  var clearMarkers = function(){
    for (var i = markers.length - 1; i >= 0; i--) {
      markers[i][0].setMap(null)
    };
    markers = [];
  }

  var submitMarker = function(coords){

    var location = JSON.stringify(coords)
    obj.getFoodTrucks({address: location})
  }

  return obj;
}])