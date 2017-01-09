class AddColumnsToCountries < ActiveRecord::Migration[5.0]
  def change
    add_column :countries, :background, :text
    add_column :countries, :climate, :string
    add_column :countries, :natural_resources, :string
    add_column :countries, :environment, :string
    add_column :countries, :population, :string
    add_column :countries, :languages, :string
    add_column :countries, :religions, :string
    add_column :countries, :age_structure, :string
    add_column :countries, :median_age, :string
    add_column :countries, :net_migration_rate, :string
    add_column :countries, :urbanization, :string
    add_column :countries, :sex_ratio, :string
    add_column :countries, :capital, :string
    add_column :countries, :dual_citizentship, :string
    add_column :countries, :residency_requirement, :string
    add_column :countries, :government_type, :string
    add_column :countries, :gdp_per_capita, :string
    add_column :countries, :unemployment_rate, :string
    add_column :countries, :population_below_poverty_line, :string
    add_column :countries, :exports, :string
  end
end
