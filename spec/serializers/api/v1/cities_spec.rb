require "rails_helper"
feature "CitiesSerializer"
  describe "it only allows the json for the params it gets passed" do
    it "it allows id" do
      city = city(:create)
      visit
    end

end
