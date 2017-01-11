require "rails_helper"


describe 'home page' do
  # it 'shows title and subtitle when visiting home page', :js => true do
  #   driver = Selenium::WebDriver.for :chrome
  #   driver.navigate.to "http://google.com"
  #
  #   element = driver.find_element(:name, 'q')
  #   element.send_keys "Hello WebDriver!"
  #   element.submit
  #
  #   puts driver.title
  #
  #   driver.quit
  # end

  scenario "show title and subtitle when visiting home page" do
    visit root_path

    within("#app-title") do
      expect(page).to have_content('World Data Correlator')
    end

  scenario "show title and subtitle when visiting home page" do
    visit root_path

    within("#country-name-title") do
      expect(page).to have_content('Select a Country')
    end
  end


  scenario "Admin clicks on View All Events and sees all events" do
      click_link "View All Events"

      expect(current_path).to eq(admin_events_path)
      expect(page).to have_content("All Events")
      expect(page).to have_content("Image")
      expect(page).to have_content("Name")
      expect(page).to have_content("Description")
      expect(page).to have_content("Price")
      expect(page).to have_content("Category")
      expect(page).to have_content("Status")

      within("tr", text: @event_1.description) do
        expect(page).to have_css("img[src*='http://robohash.org/99.png?set=set2&bgset=bg1&size=200x200']")
        expect(page).to have_content("event 1")
        expect(page).to have_content("event 1 description")
        expect(page).to have_content("25.00")
        expect(page).to have_content("Sports")
        expect(page).to have_content("active")
        expect(page).to have_link("edit")
      end
    end


    # within(".thumbnail", text: "event 1") do
    #   expect(page).to have_content("event 1 description")
    #   expect(page).to have_content("$25.00")
    # end
    # within(".thumbnail", text: "event 2") do
    #   expect(page).to have_content("event 2 description")
    #   expect(page).to have_content("$50.00")
    # end
  end
end
