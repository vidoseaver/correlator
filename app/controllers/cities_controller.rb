class CitiesController < ApplicationController

  @@world_data = File.read('./app/assets/world-110m.json')

  @@tsv_data = File.read('./app/assets/world-country-names.tsv')

  def world_data
    # require "pry"; binding.pry
    render :json => @@world_data
  end
  #
  def tsv_data
    render :json => @@tsv_data
  end

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
