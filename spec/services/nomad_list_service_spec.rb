require 'rails_helper'

describe "NomadListService" do
  context "#city_by_name(name)" do
    it "returns the specs for that specific city" do
      VCR.use_cassette("city_by_name(bangkok-thailand)") do
        specs = NomadListService.new.city_by_name("bangkok-thailand")

        expect(specs.class).to eq(Hash)
        expect(specs[:type]).to eq('city')
        expect(specs).to have_key(:result)
      end
    end
  end

  context "#all_cities" do
    it "returns the specs for all the cities" do
      VCR.turned_off do
        WebMock.allow_net_connect!
      # VCR.use_cassette("all_cities") do

        cities = NomadListService.new.all_cities

        expect(cities.class).to eq(Hash)
        expect(cities[:ok]).to eq(true)
        expect(cities[:type]).to eq("cities")
      end
    end
  end
end
