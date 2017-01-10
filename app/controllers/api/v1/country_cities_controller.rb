class Api::V1::CountryCitiesController < ApplicationController
  def show
    binding.pry
    country = Country.find_by(d3_id: params[:id].to_i)
    render json: country.cities, each_serializer: Api::V1::CountryCitiesSerializer
  end
end
