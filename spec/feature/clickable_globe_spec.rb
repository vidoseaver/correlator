require "rails_helper"

describe 'home page' do
  scenario "show title when visiting home page" do
    visit root_path

    within("#app-title") do
      expect(page).to have_content('World Data Correlator')
    end
  end

  scenario "show subtitle when visiting home page" do
    visit root_path

    within("#country-name-title") do
      expect(page).to have_content('Select a Country')
    end
  end

  scenario "page has a header with styling" do
    visit root_path

    page.has_css?('header h1.app-title')
  end

  scenario "page has a globe and data container with styling" do
    visit root_path

    page.has_css?('body section.globe-and-data-container')
  end

  scenario "page has a country info container with styling" do
    visit root_path

    page.has_css?('body section#country_info_container')
  end

  scenario "page has a bar-graph with styling" do
    visit root_path

    page.has_css?('body div#bar-graph')
  end

  scenario "page has a glove nav container with styling" do
    visit root_path

    page.has_css?('body nav#globe_nav_container')
  end


  scenario "show instructions-title when visiting home page" do
    visit root_path

    Timeout::timeout(5) {
      within("#instructions-title") do
        expect(page).to have_content('Click a Country to View Its Data')
        end
    }
  end

  scenario "user clicks a country and country data is rendered" do
    visit root_path
    click_link(".clickable")

    within("#instructions-title") do
      expect(page).to have_content('Click a Country to View Its Data')
      end
  end

  scenario "user clicks a country and country data is rendered" do
    visit world_data_url

    within("#instructions-title") do
      expect(page).to have_content('Click a Country to View Its Data')
      expect(page).to have_content("Capital:")
        expect(page).to have_content("Population:")
        expect(page).to have_content("Languages:")
        expect(page).to have_content("Historical Background:")
        expect(page).to have_content("Government Type:")
        expect(page).to have_content("Dual Citizenship")
        expect(page).to have_content("Residency Requirement")
      end
  end
end
