class HerokuAppService

  def initialize
    @base_url = "http://corre1ator.herokuapp.com/api/v1/cities?id&slug&url&country_id&name&nomad_score&life_score&free_wifi_available&peace_score&fragile_states_index&freedom_score&press_freedom_index&nightlife&leisure&places_to_work&air_con&safety&friendly_to_foreigners&racism&lgbt_friendly&female_friendly&air_bnb_median_us&cost_as_nomad_us&cost_longterm_us&cost_shortterm_us&air_bnb_vs_appartment_price_ratio"
  end

  def all_cities
    getter_and_parser
  end

  private

    attr_reader :base_url

    def getter_and_parser
      response = Faraday.get(base_url)
      parsed_response = JSON.parse(response.body, symbolize_names:true)
    end
end
