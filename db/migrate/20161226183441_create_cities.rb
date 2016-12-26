class CreateCities < ActiveRecord::Migration[5.0]
  def change
    create_table :cities do |t|
      t.references :country, index:true, foreign_key:true
      t.string :name
      t.string :url
      t.string :slug
      t.float :nomad_score
      t.float :life_score
      t.float :free_wifi_available
      t.float :peace_score
      t.float :fragile_states_index
      t.float :freedom_score
      t.float :press_freedom_index
      t.float :nightlife
      t.float :leisure
      t.float :places_to_work
      t.float :air_con
      t.float :safety
      t.float :friendly_to_foreigners
      t.float :racism
      t.float :lgbt_friendly
      t.float :female_friendly
      t.float :air_bnb_median_us
      t.float :cost_as_nomad_us
      t.float :cost_longterm_us
      t.float :cost_shortterm_us
      t.float :air_bnb_vs_appartment_price_ratio

      t.timestamps
    end
  end
end
