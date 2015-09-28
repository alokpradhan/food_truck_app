class FoodTruck < ActiveRecord::Base

  include Geocoder

  has_many :operations
  has_many :locations, through: :operations

  def self.data(location = request.remote_ip)
    food_trucks_result = []

    geoLocation = (location[0] != '[') ? Geocoder.coordinates(location) : JSON.parse(location)

    locations = Location.all

    locations.each do |locate|

      if locate.lat && ((locate.lat - geoLocation[0]).abs) <= 0.005  # Latitude
        if locate.long && ((locate.long - geoLocation[1]).abs) <= 0.005  # Longitude
          food_trucks_result.push(locate.food_trucks)
        end
      end
    end
    food_trucks_result
  end

end


