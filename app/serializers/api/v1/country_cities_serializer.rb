class Api::V1::CountryCitiesSerializer < ActiveModel::Serializer
  attributes :id, :name, :slug
end
