# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170108220918) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cities", force: :cascade do |t|
    t.integer  "country_id"
    t.string   "name"
    t.string   "url"
    t.string   "slug"
    t.float    "nomad_score"
    t.float    "life_score"
    t.float    "free_wifi_available"
    t.float    "peace_score"
    t.float    "fragile_states_index"
    t.float    "freedom_score"
    t.float    "press_freedom_index"
    t.float    "nightlife"
    t.float    "leisure"
    t.float    "places_to_work"
    t.float    "air_con"
    t.float    "safety"
    t.float    "friendly_to_foreigners"
    t.float    "racism"
    t.float    "lgbt_friendly"
    t.float    "female_friendly"
    t.float    "air_bnb_median_us"
    t.float    "cost_as_nomad_us"
    t.float    "cost_longterm_us"
    t.float    "cost_shortterm_us"
    t.float    "air_bnb_vs_appartment_price_ratio"
    t.datetime "created_at",                        null: false
    t.datetime "updated_at",                        null: false
    t.index ["country_id"], name: "index_cities_on_country_id", using: :btree
  end

  create_table "countries", force: :cascade do |t|
    t.string   "name"
    t.string   "url"
    t.string   "slug"
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
    t.text     "background"
    t.string   "climate"
    t.string   "natural_resources"
    t.string   "environment"
    t.string   "population"
    t.string   "languages"
    t.string   "religions"
    t.string   "age_structure"
    t.string   "median_age"
    t.string   "net_migration_rate"
    t.string   "urbanization"
    t.string   "sex_ratio"
    t.string   "capital"
    t.string   "dual_citizentship"
    t.string   "residency_requirement"
    t.string   "government_type"
    t.string   "gdp_per_capita"
    t.string   "unemployment_rate"
    t.string   "population_below_poverty_line"
    t.string   "exports"
    t.string   "coastline"
    t.string   "ethnic_breakdown"
    t.integer  "d3_id"
  end

  add_foreign_key "cities", "countries"
end
