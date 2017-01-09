require "csv"
class Country < ApplicationRecord
  has_many :cities

  def self.better_find_or_create_by(attributes)
    Country.create_with(url:attributes[:url], slug:attributes[:slug]).find_or_create_by(name: attributes[:name])
  end


  def self.update_or_create_by_name(json)

    name = (defined? json[:Government][:"Country name"][:"conventional short form"][:text]) ? json[:Government][:"Country name"][:"conventional short form"][:text] : "No Data"
    background = (defined? json[:Introduction][:Background][:text]) ? json[:Introduction][:Background][:text] : "No Data"
    coastline = (defined? json[:Geography][:Coastline][:text]) ? json[:Geography][:Coastline][:text] : "No Data"
    climate = (defined? json[:Geography][:Climate][:text]) ? json[:Geography][:Climate][:text] : "No Data"
    natural_resources = (defined? json[:Geography][:"Natural resources"][:text]) ? json[:Geography][:"Natural resources"][:text] : "No Data"
    environment = (defined? json[:Geography][:Terrain][:text]) ? json[:Geography][:Terrain][:text] : "No Data"
    ethnic_breakdown = (defined? json[:"People and Society"][:"Ethnic groups"][:text]) ? json[:"People and Society"][:"Ethnic groups"][:text] : "No Data"
    population = (defined? json[:"People and Society"][:Population][:text]) ? json[:"People and Society"][:Population][:text] : "No Data"
    languages = (defined? json[:"People and Society"][:Languages][:text]) ? json[:"People and Society"][:Languages][:text] : "No Data"
    religions = (defined? json[:"People and Society"][:Religions][:text]) ? json[:"People and Society"][:Religions][:text] : "No Data"
    age_structure = (defined? json[:"People and Society"][:"Age structure"]) ? json[:"People and Society"][:"Age structure"] : "No Data"
    median_age = (defined? json[:"People and Society"][:"Median age"][:total][:text]) ? json[:"People and Society"][:"Median age"][:total][:text] : "No Data"
    net_migration_rate = (defined? json[:"People and Society"][:"Net migration rate"][:text]) ? json[:"People and Society"][:"Net migration rate"][:text] : "No Data"
    urbanization = (defined? json[:"People and Society"][:Urbanization][:"urban population"][:text]) ? json[:"People and Society"][:Urbanization][:"urban population"][:text] : "No Data"
    sex_ratio = (defined? json[:"People and Society"][:"Sex ratio"][:"total population"][:text]) ? json[:"People and Society"][:"Sex ratio"][:"total population"][:text] : "No Data"
    capital = (defined? json[:Government][:Capital][:name][:text]) ? json[:Government][:Capital][:name][:text] : "No Data"
    dual_citizentship = (defined? json[:Government][:Citizenship][:"dual citizenship recognized"][:text]) ? json[:Government][:Citizenship][:"dual citizenship recognized"][:text] : "No Data"
    residency_requirement = (defined? json[:Government][:Citizenship][:"residency requirement for naturalization"][:text]) ? json[:Government][:Citizenship][:"residency requirement for naturalization"][:text] : "No Data"
    government_type = (defined? json[:Government][:"Government type"][:text]) ? json[:Government][:"Government type"][:text] : "No Data"
    gdp_per_capita = (defined? json[:Economy][:"GDP - per capita (PPP)"][:text]) ? json[:Economy][:"GDP - per capita (PPP)"][:text] : "No Data"
    unemployment_rate = (defined? json[:Economy][:"Unemployment rate"][:text]) ? json[:Economy][:"Unemployment rate"][:text] : "No Data"
    population_below_poverty_line = (defined? json[:Economy][:"Population below poverty line"][:text]) ? json[:Economy][:"Population below poverty line"][:text] : "No Data"
    exports = (defined? json[:Economy][:"Exports - commodities"][:text]) ? json[:Economy][:"Exports - commodities"][:text] : "No data"



    Country.create.with(
    url: "/country/#{name.slugify.gsub("--", "-")}",
    slug: name.slugify.gsub("--", "-"),
    background: background,
    coastline: coastline,
    climate: climate,
    natural_resources: natural_resources,
    environment: environment,
    ethnic_breakdown: ethnic_breakdown,
    population: population,
    languages: languages,
    religions: religions,
    age_structure: age_structure,
    median_age: median_age,
    net_migration_rate: net_migration_rate,
    urbanization: urbanization,
    sex_ratio: sex_ratio,
    capital: capital,
    dual_citizentship: dual_citizentship ,
    residency_requirement: residency_requirement,
    government_type: government_type,
    gdp_per_capita: gdp_per_capita,
    unemployment_rate: unemployment_rate,
    population_below_poverty_line: population_below_poverty_line,
    exports: exports).find_or_create_by(name: name)

    puts "#{name.slugify.gsub("--", "-")} updated"
  end

  def self.d3_code_assigner
    path = "app/assets/world-country-names.tsv"
    parsed_file = CSV.read(path, col_sep: "\t", headers: true, header_converters: :symbol )
    parsed_file.each do |row|
      country = Country.find_by(name: row[:name])
      country.update_attributes(d3_id:row[:id]) if !country.nil?
    end
  end
end
