class Api::V1::ShowCitySerializer < ActiveModel::Serializer
  attributes :id, :country_id, :name, :url, :slug, :nomad_score, :life_score, :free_wifi_available, :peace_score, :fragile_states_index, :freedom_score, :press_freedom_index, :nightlife, :leisure, :places_to_work, :air_con, :safety, :friendly_to_foreigners, :racism, :lgbt_friendly, :female_friendly, :air_bnb_median_us, :cost_as_nomad_us, :cost_longterm_us, :cost_shortterm_us, :air_bnb_vs_appartment_price_ratio
end
