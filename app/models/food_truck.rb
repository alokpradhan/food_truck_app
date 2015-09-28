class FoodTruck < ActiveRecord::Base

  include Geocoder

  has_many :operations
  has_many :locations, through: :operations

  def self.data(location = request.remote_ip)
    find = FoodTruck.new
    geoLocation = (location[0] != '[') ?
    Geocoder.coordinates(location) : JSON.parse(location)
    locate = find.nearbyLocations(geoLocation)
    find.trucksNearLocations(locate)
  end

  def nearbyLocations(geoLocation)
    Location.where("(lat - #{geoLocation[0]}).abs <= ?", 0.002).
              where("(long - #{geoLocation[1]}).abs <= ?", 0.002)
  end

  def trucksNearLocations(locations)
    food_trucks_result = []

    locations.each do |truckLocation|
      food_trucks_result.push(truckLocation.food_trucks)
    end
    food_trucks_result[0..25]
  end

end

