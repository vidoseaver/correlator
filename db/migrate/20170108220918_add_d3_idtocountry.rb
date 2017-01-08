class AddD3Idtocountry < ActiveRecord::Migration[5.0]
  def change
    add_column :countries, :d3_id, :integer
  end
end
