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

    it 'should return an array of trucks near a given location' do
      data = FoodTruck.data("212 Sutter Street, San Franscisco, CA")
      expect(data.class).to eql(Array)
    end

    it 'should return an array of trucks near a given coords' do
      coords = [37.79276770594336,-122.40734273713315].to_json
      data = FoodTruck.data(coords)
      expect(data.class).to eql(Array)
    end

    it 'should return an array of trucks near a given ip address' do
      data = FoodTruck.data('128.177.113.106')
      expect(data.class).to eql(Array)
    end

    it 'should not exceed length of 26' do
      data = FoodTruck.data('128.177.113.106')
      expect(data.length).to be <= (26)
    end

  end


end
