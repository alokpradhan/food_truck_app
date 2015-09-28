class FoodTruck < ActiveRecord::Base

  include Geocoder

  has_many :operations
  has_many :locations, through: :operations

  def data(location)
    valid_locations = []

    geoLocation = Geocoder.coordinates(location)

    locations = Location.all
    locations.each do |location|
      if geoLocation[0] - location.lat <= 0.01  # Latitude
        if geoLocation[1] - location.long <= 0.01  # Longitude
          valid_locations.push(location)
        end
      end
    end

    result  = FoodTruck.where()

    return self
  end

end
