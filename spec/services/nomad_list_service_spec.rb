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
end
