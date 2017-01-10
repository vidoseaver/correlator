require "rails_helper"

describe "CountryCities country endpoint", type: :request do
  it "#show endpoint" do
    country = Country.create!(name: "Thailand", url: "/country/thailand", slug: "thailand", background: "{:text=>\"A unified Thai kingdom was established in...", climate: "tropical; rainy, warm, cloudy southwest monsoon (m...", natural_resources: "tin, rubber, natural gas, tungsten, tantalum, timb...", environment: "central plain; Khorat Plateau in the east; mountai...", population: "68,200,824", languages: "Thai (official) 90.7%, Burmese 1.3%, other 8%", religions: "Buddhist (official) 93.6%, Muslim 4.9%, Christian ...", age_structure: "{:\"0-14 years\"=>{:text=>\"17.18% (male 6,000,434/fe...", median_age: "37.2 years", net_migration_rate: "0 migrant(s)/1,000 population (2016 est.)", urbanization: "50.4% of total population (2015)", sex_ratio: "0.97 male(s)/female (2016 est.)", capital: "Bangkok", dual_citizentship: "no", residency_requirement: "5 years", government_type: "constitutional monarchy; note - interim military-r...", gdp_per_capita: "$16,100 (2015 est.) ++ $15,700 (2014 est.) ++ $15,...", unemployment_rate: "0.9% (2015 est.) ++ 0.8% (2014 est.)", population_below_poverty_line: "12.6% (2012 est.)", exports: "automobiles and parts, computer and parts, jewelry...", coastline: "3,219 km", ethnic_breakdown: "Thai 95.9%, Burmese 2%, other 1.3%, unspecified 0....", d3_id:764)
    city_1 = country.cities.create(name: "Pai", url: "/pai-thailand", slug: "pai-thailand", nomad_score: 0.5, life_score: 0.66, free_wifi_available: 0.4, peace_score: 0.4, fragile_states_index: 78.8, freedom_score: 0.2, press_freedom_index: 44.53, nightlife: 0.2, leisure: 0.4, places_to_work: 0.6, air_con: 0.2, safety: 0.8, friendly_to_foreigners: 1.0, racism: 0.4, lgbt_friendly: 0.6, female_friendly: 0.6, air_bnb_median_us: 20.0, cost_as_nomad_us: 1281.0, cost_longterm_us: 959.0, cost_shortterm_us: 1281.0, air_bnb_vs_appartment_price_ratio: 2.233737)
    city_2 = country.cities.create(name: "Ko Phi Phi", url: "/ko-phi-phi-thailand", slug: "ko-phi-phi-thailand", nomad_score: 0.54, life_score: 0.67, free_wifi_available: 0.2, peace_score: 0.4, fragile_states_index: 78.8, freedom_score: 0.2, press_freedom_index: 44.53, nightlife: 1.0, leisure: 0.6, places_to_work: 0.2, air_con: 0.6, safety: 0.8, friendly_to_foreigners: 0.8, racism: 0.4, lgbt_friendly: 0.6, female_friendly: 0.6, air_bnb_median_us: 0.0, cost_as_nomad_us: 1265.0, cost_longterm_us: 718.0, cost_shortterm_us: 1265.0, air_bnb_vs_appartment_price_ratio: 1.0)

    get api_v1_country_city_path country.d3_id

    json = JSON.parse(response.body, symbolize_names: true)

    expect(response).to be_success
    expect(json.count).to eq(country.cities.count)
    expect(json.first[:id]).to eq(city_1.id)
    expect(json.first[:name]).to eq(city_1.name)
    expect(json.first[:slug]).to eq(city_1.slug)
    expect(json.second[:id]).to eq(city_2.id)
    expect(json.second[:name]).to eq(city_2.name)
    expect(json.second[:slug]).to eq(city_2.slug)

  end
end
