class AddEthnicBreakdownToCountries < ActiveRecord::Migration[5.0]
  def change
    add_column :countries, :ethnic_breakdown, :string
  end
end
