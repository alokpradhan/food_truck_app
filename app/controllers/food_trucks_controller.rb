class FoodTrucksController < ApplicationController

  def index

    @truckData = FoodTruck.all

    if params[:address]
      @truckData = FoodTruck.data(params[:address])
    end

    render json: @truckData.to_json(includes: [:location, :operations]), status: 200

  end

end
