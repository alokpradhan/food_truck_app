class FoodTrucksController < ApplicationController

  def index

    @truckData = FoodTruck.data(params[:address] = request.remote_ip)
    render json: @truckData.to_json(include: :locations), status: 200

  end

end
