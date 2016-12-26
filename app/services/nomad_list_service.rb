class NomadListService

  def initialize
    @base_url = "https://nomadlist.com/"
  end

  def city_by_name(name)
    getter_and_parser("#{name}.json")
  end

  def all_cities
    getter_and_parser("api/v2/list/cities")
  end

  private

    attr_reader :base_url

    def getter_and_parser(path)
      response = Faraday.get(base_url + path)
      parsed_response = JSON.parse(response.body, symbolize_names:true)
    end
end
