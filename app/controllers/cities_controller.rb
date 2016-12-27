class CitiesController < ApplicationController

  def index
    @cities = City.all
  end

  def show
    @city = City.find(city_id)
  end

  private
    def city_id
      params["id"].to_i
    end

end
