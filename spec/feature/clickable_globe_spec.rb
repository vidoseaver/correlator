require "rails_helper"

describe 'home page' do
  scenario "show title and subtitle when visiting home page" do
    visit root_path

    within("#app-title") do
      expect(page).to have_content('World Data Correlator')
    end
  end

  scenario "show title and subtitle when visiting home page" do
    visit root_path

    within("#country-name-title") do
      expect(page).to have_content('Select a Country')
    end
  end
end
