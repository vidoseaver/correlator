class City < ApplicationRecord
  belongs_to :country


  def self.populate_cities
    all_cities = HerokuAppService.new.all_cities
    binding.pry
    all_cities.map do |city|
      City.create_with(
        name:                              city[:name],
        country_id:                        city[:scores][:country_id],
        url:                               city[:scores][:url],
        nomad_score:                       city[:scores][:nomad_score],
        life_score:                        city[:scores][:life_score],
        free_wifi_available:               city[:scores][:free_wifi_available],
        peace_score:                       city[:scores][:peace_score],
        fragile_states_index:              city[:scores][:fragile_states_index],
        freedom_score:                     city[:scores][:freedom_score],
        press_freedom_index:               city[:scores][:press_freedom_index],
        nightlife:                         city[:scores][:nightlife],
        leisure:                           city[:scores][:leisure],
        places_to_work:                    city[:scores][:places_to_work],
        air_con:                           city[:scores][:aircon],
        safety:                            city[:scores][:safety],
        friendly_to_foreigners:            city[:scores][:friendly_to_foreigners],
        racism:                            city[:scores][:racism],
        lgbt_friendly:                     city[:scores][:lgbt_friendly],
        female_friendly:                   city[:scores][:female_friendly],
        air_bnb_median_us:                 city[:scores][:airbnb_median],
        cost_as_nomad_us:                  city[:scores][:nomad],
        cost_longterm_us:                  city[:scores][:longTerm],
        cost_shortterm_us:                 city[:scores][:shortTerm],
        air_bnb_vs_appartment_price_ratio: city[:scores][:airbnb_vs_apartment_price_ratio])
        .find_or_create_by(slug: city[:scores][:slug])
    end
  end
end
