require 'rails_helper'

RSpec.describe Country, type: :model do
  context "relationships" do
    it "has many cities" do
      country = create(:country)
      expect(country).to respond_to(:cities)
    end
  end
  describe "class_methods" do
    context "better_find_or_create_by(attributes)" do
      it "will create a country if none exists" do
        VCR.use_cassette("all_cities") do
          specs = NomadListService.new.all_cities
           country = Country.better_find_or_create_by(specs[:result].first[:info][:country])

           expect(country).to be_an(Country)
        end
      end
      # it "will retrieve a pre-existing record" do
      #   VCR.use_cassette("all_cities") do
      #     specs = NomadListService.new.all_cities
      #      country = Country.better_find_or_create_by(specs[:result].first[:info][:country])
      #      country_again = Country.better_find_or_create_by(specs[:result].first[:info][:country])
      #
      #      expect(country.updated_at).to be(country_again.updated_at)
      #   end
      # end
    end
  end
end
