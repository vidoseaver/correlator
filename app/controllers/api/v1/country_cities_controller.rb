class Api::V1::CountryCitiesController < ApplicationController
  def show
    country = Country.find_by(d3_id: params[:id].to_i)
    render json: country.cities
  end
end
