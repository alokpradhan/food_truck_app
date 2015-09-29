class FoodTrucksController < ApplicationController

  def index
    p "********************"
    p request.remote_ip
    if params[:address]
      @truckData = FoodTruck.data(params[:address])
    else
      @truckData = FoodTruck.data(request.remote_ip)
    end
    render json: @truckData.to_json(include: :locations), status: 200

  end

end
