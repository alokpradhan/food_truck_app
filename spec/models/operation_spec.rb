require 'rails_helper'

RSpec.describe Operation, type: :model do

  let(:operation){create(:operation)}

  context '(associations)' do

    it 'has a food truck' do
      expect(operation).to respond_to(:food_truck)
    end

    it 'has a location' do
      expect(operation).to respond_to(:location)
    end

  end

  context '(validations)' do

    let(:operation2){build(:operation, {food_truck: nil})}
    let(:operation3){build(:operation, {location: nil})}

    it 'requires a food truck' do
      expect{operation2.save!}.to raise_error Exception
    end

    it 'requires a location' do
      expect{operation3.save!}.to raise_error Exception
    end

  end

end
