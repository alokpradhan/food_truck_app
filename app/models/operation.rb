class Operation < ActiveRecord::Base
  belongs_to :food_truck
  belongs_to :location

  validates :food_truck_id,
            :location_id,
            presence: true

end
