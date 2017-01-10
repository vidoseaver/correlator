require 'rails_helper'

describe "HerokuAppService" do
  context "#all_cities" do
    it "returns an array of json for each of the cities" do
      VCR.use_cassette "HerokuAppService#all_cities" do

        cities = HerokuAppService.new.all_cities

        expect(cities.count).to eq(781)
        expect(cities.class).to eq(Array)
        expect(cities.first.class).to eq(Hash)
      end
    end
  end
end
