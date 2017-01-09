class RemoveSlugAndUrlFromCities < ActiveRecord::Migration[5.0]
  def change
    remove_column :cities, :url
    remove_column :cities, :slug
  end
end
