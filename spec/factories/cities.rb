FactoryGirl.define do
  factory :city do
    country
    name "MyString"
    url "MyString"
    slug "MyString"
    nomad_score 1.5
    life_score 1.5
    free_wifi_available 1.5
    peace_score 1.5
    fragile_states_index 1.5
    freedom_score 1.5
    press_freedom_index 1.5
    nightlife 1.5
    leisure 1.5
    places_to_work 1.5
    air_con 1.5
    safety 1.5
    friendly_to_foreigners 1.5
    racism 1.5
    lgbt_friendly 1.5
    female_friendly 1.5
    air_bnb_median_us 1.5
    cost_as_nomad_us 1.5
    cost_longterm_us 1.5
    cost_shortterm_us 1.5
  end
end
