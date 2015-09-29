class FoodTruck < ActiveRecord::Base
  include Geocoder

  has_many :operations
  has_many :locations, through: :operations

  def self.data(location)
    find = FoodTruck.new

     # check to see if an array of coords was passed
    if (location[0] == '[')
      geo_location = JSON.parse(location)
    # check to see if a street adress was passed
    elsif location[-1] =='A'
      geo_location = Geocoder.coordinates(location)
    # else an ip address was passed
    else
      response = HTTParty.get('http://ip-api.com/json/'+location)
      geo_location = [response['lat'], response['lon']]
    end

    find.trucks_near_locations(geo_location)
  end

  def trucks_near_locations(geo_location, radius = 0.005, food_trucks_result = [])
    locations = nearby_locations(geo_location, radius)

    locations.each do |truckLocation|
      food_trucks_result.push(truckLocation.food_trucks)
    end
    # recursive function call to increase search radius until 26 trucks are found
    if food_trucks_result.length < 26 && radius < 0.2
      trucks_near_locations(geo_location, radius + 0.002, food_trucks_result)
    end

    food_trucks_result[0..25]
  end

  def nearby_locations(geo_location, radius)
    Location.where("(lat - #{geo_location[0]}).abs <= ?", radius)
      .where("(long - #{geo_location[1]}).abs <= ?", radius)
  end
end
