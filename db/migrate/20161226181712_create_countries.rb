class CreateCountries < ActiveRecord::Migration[5.0]
  def change
    create_table :countries do |t|
      t.string :name
      t.string :url
      t.string :slug

      t.timestamps
    end
  end
end
