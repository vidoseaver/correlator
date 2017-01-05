class City < ApplicationRecord
  belongs_to :country

  # attr_reader :id, :country_id, :name, :url, :slug, :nomad_score, :life_score, :free_wifi_available, :peace_score, :fragile_states_index, :freedom_score, :press_freedom_index, :nightlife, :leisure, :places_to_work, :air_con, :safety, :friendly_to_foreigners, :racism, :lgbt_friendly, :female_friendly, :air_bnb_median_us, :cost_as_nomad_us, :cost_longterm_us, :cost_shortterm_us, :air_bnb_vs_appartment_price_ratio

  def self.populate_cities
    all_cities = NomadListService.new.all_cities[:result]
    all_cities.map do |city|
      country_attributes = city[:info][:country]
      info = city[:info][:city]
      scores = city[:scores]
      costs = city[:cost]
      country = Country.better_find_or_create_by(country_attributes)
      City.create_with(
        country_id:                        country.id,
        name:                              info[:name],
        url:                               info[:url],
        slug:                              info[:slug],
        nomad_score:                       scores[:nomad_score],
        life_score:                        scores[:life_score],
        free_wifi_available:               scores[:free_wifi_available],
        peace_score:                       scores[:peace_score],
        fragile_states_index:              scores[:fragile_states_index],
        freedom_score:                     scores[:freedom_score],
        press_freedom_index:               scores[:press_freedom_index],
        nightlife:                         scores[:nightlife],
        leisure:                           scores[:leisure],
        places_to_work:                    scores[:places_to_work],
        air_con:                           scores[:aircon],
        safety:                            scores[:safety],
        friendly_to_foreigners:            scores[:friendly_to_foreigners],
        racism:                            scores[:racism],
        lgbt_friendly:                     scores[:lgbt_friendly],
        female_friendly:                   scores[:female_friendly],
        air_bnb_median_us:                 costs[:airbnb_median][:USD],
        cost_as_nomad_us:                  costs[:nomad][:USD],
        cost_longterm_us:                  costs[:longTerm][:USD],
        cost_shortterm_us:                 costs[:shortTerm][:USD],
        air_bnb_vs_appartment_price_ratio: costs[:airbnb_vs_apartment_price_ratio]
      ).find_or_create_by(slug: info[:slug])
    end
  end
end
