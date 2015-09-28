class FoodTruck < ActiveRecord::Base

  include Geocoder

  has_many :operations
  has_many :locations, through: :operations

  def data(location)
    food_trucks_result = []

    geoLocation = Geocoder.coordinates(location)

    locations = Location.all
    locations.each do |location|
      if geoLocation[0] - location.lat <= 0.01  # Latitude
        if geoLocation[1] - location.long <= 0.01  # Longitude
          food_trucks_result.push(location.food_trucks)
        end
      end
    end
    food_trucks_result
  end

end
