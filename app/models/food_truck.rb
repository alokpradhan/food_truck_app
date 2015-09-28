class FoodTruck < ActiveRecord::Base

  include Geocoder

  has_many :operations
  has_many :locations, through: :operations

  def self.data(location = request.remote_ip)
    find = FoodTruck.new
    geoLocation = (location[0] != '[') ?
    Geocoder.coordinates(location) : JSON.parse(location)
    find.trucksNearLocations(geoLocation)
  end

  def nearbyLocations(geoLocation, radius)
    Location.where("(lat - #{geoLocation[0]}).abs <= ?", radius).
              where("(long - #{geoLocation[1]}).abs <= ?", radius)
  end

  def trucksNearLocations(geoLocation, radius = 0.005, food_trucks_result = [])

    locations = nearbyLocations(geoLocation, radius)

    locations.each do |truckLocation|
      food_trucks_result.push(truckLocation.food_trucks)
    end

    if food_trucks_result.length < 26
      trucksNearLocations(geoLocation, radius += 0.002, food_trucks_result)
    end

    food_trucks_result[0..25]
  end

end

