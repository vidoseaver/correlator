class Api::V1::CitySerializer < ActiveModel::Serializer
  attributes :name, :scores, :country

  def scores
    @instance_options[:option_name].keys.reduce({}) do |hash, key|
      hash[key.to_sym] = object[key.to_sym]
      hash
    end
  end

  def name
    object[:name]
  end

  def country
    Country.find(object[:country_id]).name
  end

end
