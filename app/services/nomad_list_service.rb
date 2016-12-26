class NomadListService
  def city_by_name(name)
    response = Faraday.get("https://nomadlist.com/#{name}.json")
    parsed_response = JSON.parse(response.body, symbolize_names:true)
  end
end
