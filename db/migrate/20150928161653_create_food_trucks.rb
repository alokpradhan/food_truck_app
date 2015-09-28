class CreateFoodTrucks < ActiveRecord::Migration
  def change
    create_table :food_trucks do |t|
      t.string :name
      t.string :food_items
      t.string :facility

      t.timestamps null: false
    end
  end
end
