class Country < ApplicationRecord
  has_many :cities

  def self.better_find_or_create_by(attributes)
    Country.create_with(url:attributes[:url], slug:attributes[:slug]).find_or_create_by(name: attributes[:name])
  end
end
