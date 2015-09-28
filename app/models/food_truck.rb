class FoodTruck < ActiveRecord::Base

  include Geocoder

  has_many :operations
  has_many :locations, through: :operations

  def self.data(location)
    food_trucks_result = []

    geoLocation = location.length == 2 ? Geocoder.coordinates(location) : location.map {|coord| coord.to_d}

    locations = Location.all
    locations.each do |location|

      if location.lat && ((location.lat - geoLocation[0]).abs) <= 0.005  # Latitude
        if location.long && ((location.long - geoLocation[1]).abs) <= 0.005  # Longitude
          food_trucks_result.push(location.food_trucks)
        end
      end
    end
    food_trucks_result
  end

end


