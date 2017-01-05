require "rails_helper"

feature "CitiesSerializer", type: :request do
  describe "it only allows the json for the params it gets passed" do

    country = Country.create!(name: "Thailand", url: "/country/thailand", slug: "thailand")
    city = City.create!( country_id:country.id, name: "Chiang Mai", url: "/chiang-mai-thailand", slug: "chiang-mai-thailand", nomad_score: 1.0, life_score: 0.8, free_wifi_available: 0.6, peace_score: 0.4, fragile_states_index: 78.8, freedom_score: 0.2, press_freedom_index: 44.53, nightlife: 0.4, leisure: 0.62, places_to_work: 1.0, air_con: 0.6, safety: 0.8, friendly_to_foreigners: 0.6, racism: 0.4, lgbt_friendly: 0.6, female_friendly: 0.8, air_bnb_median_us: 31.0, cost_as_nomad_us: 764.0, cost_longterm_us: 773.0, cost_shortterm_us: 764.0, air_bnb_vs_appartment_price_ratio: 3.442329, )

    it "it always allows name" do
      get "/api/v1/cities/#{city.id}"

      json = JSON.parse(response.body, symbolize_names:true)
      first_city = json.first
      expect(first_city[:name]).to eq(city[:name])
    end


    it "it always allows life_score" do

      get "/api/v1/cities/#{city.id}?life_score"

      json = JSON.parse(response.body, symbolize_names:true)
      first_city = json.first

      expect(first_city[:scores][:life_score]).to eq(city[:life_score])
    end

    it "it always allows all the attributes" do

      get "/api/v1/cities/#{city.id}?country_id&name&url&slug&nomad_score&life_score&free_wifi_available&peace_score&fragile_states_index&freedom_score&press_freedom_index&nightlife&leisure&places_to_work&air_con&safety&friendly_to_foreigners&racism&lgbt_friendly&female_friendly&air_bnb_median_us&cost_as_nomad_us&cost_longterm_us&cost_shortterm_us&air_bnb_vs_appartment_price_ratio"

      json = JSON.parse(response.body, symbolize_names:true)
      first_city = json.first

      expect(first_city[:scores][:nomad_score]).to eq(city[:nomad_score])
      expect(first_city[:scores][:slug]).to eq(city[:slug])
      expect(first_city[:scores][:life_score]).to eq(city[:life_score])
      expect(first_city[:scores][:free_wifi_available]).to eq(city[:free_wifi_available])
      expect(first_city[:scores][:peace_score]).to eq(city[:peace_score])
      expect(first_city[:scores][:fragile_states_index]).to eq(city[:fragile_states_index])
      expect(first_city[:scores][:freedom_score]).to eq(city[:freedom_score])
      expect(first_city[:scores][:press_freedom_index]).to eq(city[:press_freedom_index])
      expect(first_city[:scores][:nightlife]).to eq(city[:nightlife])
      expect(first_city[:scores][:leisure]).to eq(city[:leisure])
      expect(first_city[:scores][:places_to_work]).to eq(city[:places_to_work])
      expect(first_city[:scores][:air_con]).to eq(city[:air_con])
      expect(first_city[:scores][:safety]).to eq(city[:safety])
      expect(first_city[:scores][:friendly_to_foreigners]).to eq(city[:friendly_to_foreigners])
      expect(first_city[:scores][:racism]).to eq(city[:racism])
      expect(first_city[:scores][:lgbt_friendly]).to eq(city[:lgbt_friendly])
      expect(first_city[:scores][:female_friendly]).to eq(city[:female_friendly])
      expect(first_city[:scores][:cost_as_nomad_us]).to eq(city[:cost_as_nomad_us])
      expect(first_city[:scores][:cost_longterm_us]).to eq(city[:cost_longterm_us])
      expect(first_city[:scores][:cost_shortterm_us]).to eq(city[:cost_shortterm_us])
      expect(first_city[:scores][:air_bnb_vs_appartment_price_ratio]).to eq(city[:air_bnb_vs_appartment_price_ratio])
    end
  end
end
