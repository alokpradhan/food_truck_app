class Operation < ActiveRecord::Base
  belongs_to :food_truck
  belongs_to :location
end
