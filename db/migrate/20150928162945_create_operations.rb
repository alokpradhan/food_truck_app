class CreateOperations < ActiveRecord::Migration
  def change
    create_table :operations do |t|
      t.integer :food_truck_id
      t.integer :location_id
      t.string :day
      t.string :hours_start
      t.string :hours_end

      t.timestamps null: false
    end
  end
end
