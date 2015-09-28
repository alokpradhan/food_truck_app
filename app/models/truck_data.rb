class TruckData

include HTTParty

def initialize
  @data = []
  get_truck_data
  populate_food_trucks
end

def get_truck_data
  @data = self.class.get('http://data.sfgov.org/resource/rqzj-sfat.json')
end

def populate_food_trucks
  @data.each do |truck|
      foodTruck = FoodTruck.new
      foodTruck.name = truck['applicant'] #if truck['applicant'] != nil
      foodTruck.food_items = truck['fooditems'] #if truck['fooditems'] != nil
      foodTruck.facility = truck['facilitytype'] #if truck['facilitytype'] != nil
      foodTruck.save!

      location = Location.new
      location.lat = truck['location']['latitude'] if truck['location'] != nil
      location.long = truck['location']['longitude'] if truck['location'] != nil
      location.address = truck['address'] #if truck != nil
      location.description = truck['locationdescription'] #if truck['locationdescription'] != nil
      location.save!

      operation = Operation.new
      operation.food_truck_id = foodTruck.id
      operation.location_id = location.id
      operation.day = truck['dayshours'] #!= nil
      operation.save!
  end

end

end