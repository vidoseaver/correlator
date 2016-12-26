class Api::V1::CitiesController < ApplicationController
  def index
    render json: City.all
  end

  def show
    render json: City.find_by(city_params)
  end

  private
    def city_params
      params.permit(:id,:name)
    end

end
