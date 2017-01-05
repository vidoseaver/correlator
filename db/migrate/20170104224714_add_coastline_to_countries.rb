class AddCoastlineToCountries < ActiveRecord::Migration[5.0]
  def change
    add_column :countries, :coastline, :string
  end
end
