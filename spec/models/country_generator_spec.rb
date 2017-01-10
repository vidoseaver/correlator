require "rails_helper"

describe "Country_generator" do
  it "takes a json file and populates the creates and/or updates that country in the database" do
    json = File.read("./app/assets/factbook/africa/ag.json")

    country = CountryGenerator.generate_or_update_country_from_cia_factbook(json)

    expect(country.class).to eq(Country)
    expect(country.url).to_not be(nil)
    expect(country.slug).to_not be(nil)
    expect(country.background).to_not be(nil)
    expect(country.coastline).to_not be(nil)
    expect(country.climate).to_not be(nil)
    expect(country.natural_resources).to_not be(nil)
    expect(country.environment).to_not be(nil)
    expect(country.ethnic_breakdown).to_not be(nil)
    expect(country.population).to_not be(nil)
    expect(country.languages).to_not be(nil)
    expect(country.religions).to_not be(nil)
    expect(country.age_structure).to_not be(nil)
    expect(country.median_age).to_not be(nil)
    expect(country.net_migration_rate).to_not be(nil)
    expect(country.urbanization).to_not be(nil)
    expect(country.sex_ratio).to_not be(nil)
    expect(country.capital).to_not be(nil)
    expect(country.dual_citizentship).to_not be(nil)
    expect(country.residency_requirement).to_not be(nil)
    expect(country.government_type).to_not be(nil)
    expect(country.gdp_per_capita).to_not be(nil)
    expect(country.unemployment_rate).to_not be(nil)
    expect(country.population_below_poverty_line).to_not be(nil)
    expect(country.exports).to_not be(nil)
  end
end
