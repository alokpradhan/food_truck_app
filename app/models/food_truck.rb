class FoodTruck < ActiveRecord::Base
  include Geocoder

  has_many :operations
  has_many :locations, through: :operations

  def self.data(location)
    find = FoodTruck.new
    geo_location = (location[0] != '[') ? Geocoder.coordinates(location) : JSON.parse(location)
    find.trucks_near_locations(geo_location)
  end

  def nearby_locations(geo_location, radius)
    Location.where("(lat - #{geo_location[0]}).abs <= ?", radius)
      .where("(long - #{geo_location[1]}).abs <= ?", radius)
  end

  def trucks_near_locations(geo_location, radius = 0.005, food_trucks_result = [])
    locations = nearby_locations(geo_location, radius)

    locations.each do |truckLocation|
      food_trucks_result.push(truckLocation.food_trucks)
    end

    if food_trucks_result.length < 26 && radius < 0.2
      trucks_near_locations(geo_location, radius + 0.002, food_trucks_result)
    end

    food_trucks_result[0..25]
  end
end
