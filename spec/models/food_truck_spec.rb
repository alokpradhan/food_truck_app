require 'rails_helper'

RSpec.describe FoodTruck, type: :model do
  let(:food_truck){create(:food_truck)}

  context '(associations)' do

    it 'has many locations' do
      expect(food_truck).to respond_to(:locations)
    end

    it 'operates on multiple days and times' do
      expect(food_truck).to respond_to(:operations)
    end

  end


end
