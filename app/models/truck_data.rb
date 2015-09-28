class TruckData

include HTTParty

base_uri 'http://data.sfgov.org/api/views/rqzj-sfat.json'

def initialize
  @data = []
  get_truck_data
end

def get_truck_data
  @data = self.class.get(base_uri)
end

def populate_food_trucks

  @data.each do |truck|
      foodTruck = FoodTruck.new
      foodTruck.name = truck.applicant
      foodTruck.food_items = truck.fooditems
      foodTruck.facility

      location = Location.new
      location.lat = truck.location.latitude
      location.long = truck.location.longitude
      location.address = truck.address
      location.description = truck.locationdescription

      operation = Operation.new
  end

end

end