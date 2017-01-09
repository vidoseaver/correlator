# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Dir.glob("factbook.json/**/*.json").each do |file_name|
  binding.pry

  json = JSON.parse(File.read(file_name), symbolize_names:true)
  Country.update_or_create_by_name(json)
end

Country.d3_code_assigner
