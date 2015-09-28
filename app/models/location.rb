class Location < ActiveRecord::Base
  has_many :operations
  has_many :food_trucks, through: :operations
end
