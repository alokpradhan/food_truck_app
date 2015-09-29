class FoodTrucksController < ApplicationController

  def index
    if params[:address]
      @truckData = FoodTruck.data(params[:address])
    else
      @truckData = FoodTruck.data(request.remote_ip)
    end
    render json: @truckData.to_json(include: [:locations, :operations]), status: 200

  end

end
