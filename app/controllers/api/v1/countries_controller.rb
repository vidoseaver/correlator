class Api::V1::CountriesController < ApplicationController
  def show
    render json: Country.find_by(d3_id: country_id)
  end

  private

    def strong_params
      params.permit(:id)
    end

    def country_id
      strong_params["id"]
    end
end
