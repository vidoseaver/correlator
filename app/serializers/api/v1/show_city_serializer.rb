class Api::V1::ShowCitySerializer < ActiveModel::Serializer
  attributes :city_scores_arrayed, :names_arrayed, :id, :country_id, :name, :url, :slug, :nomad_score, :life_score, :free_wifi_available, :peace_score, :fragile_states_index, :freedom_score, :press_freedom_index, :nightlife, :leisure, :places_to_work, :air_con, :safety, :friendly_to_foreigners, :racism, :lgbt_friendly, :female_friendly, :air_bnb_median_us, :cost_as_nomad_us, :cost_longterm_us, :cost_shortterm_us, :air_bnb_vs_appartment_price_ratio

  def city_scores_arrayed
    var = [object[:nomad_score]*100, object[:life_score]*100, object[:free_wifi_available]*100, object[:peace_score]*100, object[:freedom_score]*100, object[:nightlife]*100, object[:leisure]*100, object[:places_to_work]*100, object[:safety]*100, object[:friendly_to_foreigners]*100, object[:racism]*100, object[:lgbt_friendly]*100, object[:female_friendly]*100]
  end

  def names_arrayed
    ["Nomad Score", "Life Score", "Free Wifi Available", "Peace Score", "Freedom Score",  "Nightlife", "Leisre", "Places to Work", "Safety", "Friendly to Foreigners", "Racism", "LGBT Friendly", "Female Friendly"]
  end
end
