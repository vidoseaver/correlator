class CitiesController < ApplicationController

  def index
    @cities = City.all
  end

  def show
    @city = City.find()
  end

  private
    params.permit(:id)
end
