class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.decimal :lat
      t.decimal :long
      t.string :address
      t.string :description

      t.timestamps null: false
    end
  end
end
