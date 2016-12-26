require 'rails_helper'
RSpec.describe City, type: :model do
  context "relationships" do
    it "belongs to a country" do
      city = create(:city)
      expect(city).to respond_to(:country)
    end
  end
  describe "class_methods" do
    context ".populate_cities" do
      it "takes json from the NomadListService and populates the database with it" do
        VCR.use_cassette("all_cities_for_populate_cities") do

          raw_cities = NomadListService.new.all_cities[:result]
          cities =  City.populate_cities
          
          expect(raw_cities.count).to eq(cities.count)
          expect(City.count).to eq (cities.count)
        end
      end
    end
  end
end
