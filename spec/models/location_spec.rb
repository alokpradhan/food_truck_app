require 'rails_helper'

RSpec.describe Location, type: :model do

  let(:location){create(:location)}

  context '(associations)' do

    it 'has many food trucks' do
      expect(location).to respond_to(:food_trucks)
    end

    it 'can function on many days and times' do
      expect(location).to respond_to(:operations)
    end

  end

end
