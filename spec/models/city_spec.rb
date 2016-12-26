require 'rails_helper'
RSpec.describe City, type: :model do
  context "relationships" do
    it "belongs to a country" do
      city = create(:city)
      expect(city).to respond_to(:country)
    end
  end
end
