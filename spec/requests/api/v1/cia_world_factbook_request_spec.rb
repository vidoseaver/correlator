require 'rails_helper'

describe "CiaWorldFactBook country endpoint", type: :request do
  it "#show endpoint" do
    country = Country.create!(name: "Thailand", url: "/country/thailand", slug: "thailand", background: "{:text=>\"A unified Thai kingdom was established in...", climate: "tropical; rainy, warm, cloudy southwest monsoon (m...", natural_resources: "tin, rubber, natural gas, tungsten, tantalum, timb...", environment: "central plain; Khorat Plateau in the east; mountai...", population: "68,200,824", languages: "Thai (official) 90.7%, Burmese 1.3%, other 8%", religions: "Buddhist (official) 93.6%, Muslim 4.9%, Christian ...", age_structure: "{:\"0-14 years\"=>{:text=>\"17.18% (male 6,000,434/fe...", median_age: "37.2 years", net_migration_rate: "0 migrant(s)/1,000 population (2016 est.)", urbanization: "50.4% of total population (2015)", sex_ratio: "0.97 male(s)/female (2016 est.)", capital: "Bangkok", dual_citizentship: "no", residency_requirement: "5 years", government_type: "constitutional monarchy; note - interim military-r...", gdp_per_capita: "$16,100 (2015 est.) ++ $15,700 (2014 est.) ++ $15,...", unemployment_rate: "0.9% (2015 est.) ++ 0.8% (2014 est.)", population_below_poverty_line: "12.6% (2012 est.)", exports: "automobiles and parts, computer and parts, jewelry...", coastline: "3,219 km", ethnic_breakdown: "Thai 95.9%, Burmese 2%, other 1.3%, unspecified 0....")

    get "/api/v1/countries/#{country.id}"

    json = JSON.parse(response.body, symbolize_names:true)

    expect(json[:name]).to eq(country.name)
    expect(json[:population]).to eq(country.population)
  end
end
