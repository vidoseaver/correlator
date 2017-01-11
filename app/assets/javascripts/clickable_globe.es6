var width = 450,
    height = 450;

var colors = { clickable: "black", hover: "tomato", clicked: "orange", clickhover: "darkorange" };

var projection = d3.geoOrthographic()
  .scale(width / 2)
  .translate([width / 2, height / 2])
  .clipAngle(90)
  .precision(10);

var path = d3.geoPath()
  .projection(projection);

var graticule = d3.geoGraticule();

var map = d3.select("#globe_nav_container")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("class", "map");

var tooltip = d3.select("#globe_nav_container")
  .append("div")
  .attr("class", "hidden tooltip");

map.append("defs")
  .append("path")
  .datum({type: "Sphere"})
  .attr("id", "sphere")
  .attr("d", path);

//APPENDS OUTER GLOBE BORDER
map.append("use")
  .attr("class", "stroke")
  .attr("xlink:href", "#sphere");

// APPENDS GRIDLINES
map.append("path")
  .datum(graticule)
  .attr("class", "graticule")
  .attr("d", path);

$(".current-country-data").append(`
  <section class="instructions-section">
    <h3 id="instructions-title">Click a Country to View Its Data</h3>
    <p id="instructions">
      Once you've chosen a country, click on available cities. You will be able to view a Country's demographic information based on the <a href="https://www.cia.gov/library/publications/the-world-factbook/" target="_blank">CIA World Factbook.</a> Once you click on a country, you can view a respective city's "livability" ratings courtesty of <a href="https://nomadlist.com/" target="_blank">NomadList</a>.
    </p>
  </sectin>
`)

$.ajax({
  method: "GET",
  url: "/world_data",
  async: true,
  dataType: "json",
  success: function(world_data) {
    renderWorld(world_data[0], world_data[1])
  }
})

function renderWorld(world, names) {
  var world = JSON.parse(world)
  var names = d3.tsvParse(names)
  var globe = {type: "Sphere"},
    land = topojson.feature(world, world.objects.land),
    countries = topojson.feature(world, world.objects.countries).features,
    borders = topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; });
  countries = countries.filter(function(d) {
    return names.some(function(n) {
      if (d.id == n.id) return d.name = n.name;
    });
  }).sort(function(a, b) {
    return a.name.localeCompare(b.name);
  });

  map.insert("path", ".graticule")
    .datum(topojson.feature(world, world.objects.land))
    .attr("class", "land")
    .attr("d", path);

    for(var i = 0; i < names.length; i++) {
      for (var j = 0; j < countries.length; j++) {
        if (countries[j].id == names[i].id) {
          map.insert("path", ".graticule")
            .datum(countries[j])
            .attr("fill", colors.clickable)
            .attr("d", path)
            .attr("class", "clickable")
            .attr("world110-country-id", j)
            .attr("database-id", names[i].id)
            .on("click", function() {
              $(".current-country-data").text("")
              var databaseCountryID = $(this).attr("database-id")

              $.ajax({
                method: "GET",
                url: `/api/v1/countries/${databaseCountryID}`,
                async: true,
                dataType: "json",
                success: function(clickedCountry) {
                  renderCountryData(clickedCountry, databaseCountryID)
                }
              })

              $.ajax({
                method: "GET",
                url: `/api/v1/country_cities/${databaseCountryID}`,
                async: true,
                dataType: "json",
                success: function(clickedCountryCities) {
                  console.log('clicked country ajax return data', clickedCountryCities)
                  renderCityDropDown(clickedCountryCities, databaseCountryID)
                }
              })

              d3.selectAll(".clicked")
                .classed("clicked", false)
                .attr("fill", colors.clickable);
              d3.select(this)
                .classed("clicked", true)
                .attr("fill", colors.clicked);

              (function transition() {
                d3.select(".clicked").transition()
                .duration(1250)
                .tween("rotate", function() {
                  var p = d3.geoCentroid(countries[d3.select(this).attr("world110-country-id")]),
                      r = d3.interpolate(projection.rotate(), [-p[0], -p[1]]);
                  return function (t) {
                    projection.rotate(r(t));
                    map.selectAll("path").attr("d", path);
                  }
                });
              })();
            })
            .on("mousemove", function(d) {
              var c = d3.select(this);
              if (c.classed("clicked")) {
                c.attr("fill", colors.clickhover);
              } else {
                c.attr("fill", colors.hover);
              }

              var mouse = d3.mouse(map.node()).map(function(d) {
                return parseInt(d);
              });
              tooltip.classed("hidden", false)
                .attr("style", "left:" + (mouse[0] - 11) +
                  "px; top:" + (mouse[1] + 260) + "px")
                .html(d.name);
            })
            .on("mouseout", function() {
              var c = d3.select(this);
              if (c.classed("clicked")) {
                c.attr("fill", colors.clicked);
              } else {
                d3.select(this).attr("fill", colors.clickable);
              }
            });
        }
      }
    }

function renderCountryData(clickedCountry, databaseCountryID) {
  if (clickedCountry.d3_id == databaseCountryID) {
    $("#country-name-title").text("")
    $("#country-name-title").append(`
      <a href=""><h1>${clickedCountry.name}</h1></a>
    `)

    $(".current-country-data").append(`
      <section class="country-facts-container">
        <h3 class="country-fact capital"><span class="country-fact-key">Capital:</span> ${clickedCountry.capital}</h3>
        <h3 class="country-fact"><span class="country-fact-key">Population:</span> ${clickedCountry.population}</h3>
        <h3 class="country-fact"><span class="country-fact-key">Languages:</span> ${clickedCountry.languages}</h3>
        <fieldset>
          <legend><span class="country-fact-key h-background-key">Historical Background:</span></legend>
          <textarea readonly id="country-background">${clickedCountry.background}</textarea>
        </fieldset>
        <h3 class="country-fact"><span class="country-fact-key">Government Type:</span> ${clickedCountry.government_type}</h3>
        <h3 class="country-fact"><span class="country-fact-key">Dual Citizenship:</span> ${clickedCountry.dual_citizenship == !undefined ? clickedCountry.dual_citizenship : "N/A"}</h3>
        <h3 class="country-fact"><span class="country-fact-key">Residency Requirement:</span> ${clickedCountry.residency_requirement}</h3>

        <h3 class="country-fact"><span class="country-fact-key">Urbanization:</span> ${clickedCountry.urbanization}</h3>
        <h3 class="country-fact"><span class="country-fact-key">Net Migration Rate:</span> ${clickedCountry.net_migration_rate}</h3>
        <h3 class="country-fact"><span class="country-fact-key">GDP/Capita:</span> ${clickedCountry.gdp_per_capita}</h3>
        <h3 class="country-fact"><span class="country-fact-key">Unemployment_rate:</span> ${clickedCountry.unemployment_rate}</h3>
        <h3 class="country-fact"><span class="country-fact-key">Population Below Poverty Line:</span> ${clickedCountry.population_below_poverty_line}</h3>

        <h3 class="country-fact"><span class="country-fact-key">Median Age:</span> ${clickedCountry.median_age}</h3>
        <h3 class="country-fact"><span class="country-fact-key">Sex Ratio:</span> ${clickedCountry.sex_ratio}</h3>
        <h3 class="country-fact"><span class="country-fact-key">Ethnic Breakdown:</span> ${clickedCountry.ethnic_breakdown}</h3>
        <h3 class="country-fact"><span class="country-fact-key">Religions:</span> ${clickedCountry.religions}</h3>

        <h3 class="country-fact"><span class="country-fact-key">Climate:</span> ${clickedCountry.climate}</h3>
        <h3 class="country-fact"><span class="country-fact-key">Coastline:</span> ${clickedCountry.coastline}</h3>
        <h3 class="country-fact"><span class="country-fact-key">Environment:</span> ${clickedCountry.environment}</h3>
        <h3 class="country-fact"><span class="country-fact-key">Natural Resources:</span> ${clickedCountry.natural_resources}</h3>
        <h3 class="country-fact"><span class="country-fact-key">Exports:</span> ${clickedCountry.exports}</h3>

      </section>
    `)
  }
}

function renderCityDropDown(clickedCountryCities, databaseCountryID) {
  $("#city-list").text("")
  var cityList = clickedCountryCities.map(function(city) {
    return (`<option value=${city.id}> ${city.name} </option>`)
  })
    $("#city-list").append(`
      <select id="city-name-container">
        <option value="default" selected>Select a City</option>
        ${cityList}
      </select>
    `)
  }

$("#city-list").on('change', "#city-name-container", function() {
  var cityId = this.value;
  getCityData(cityId);
});

function getCityData(cityId) {
  $.ajax({
    method: "GET",
    url: `/api/v1/cities/${cityId}`,
    async: true,
    dataType: "json",
    success: function(cityData) {
      console.log('clicked city ajax return data', cityData)
      renderCityData(cityData)
    }
  })
}

function renderCityData(cityData) {
  $(".current-country-data").text("");
  $(".current-country-data").append(`
    <section class="city-facts-container">
      <h3 class="city-fact city"><span class="city-fact-key">Name:</span> ${cityData.name}</h3>
      <h3 class="city-fact"><span class="city-fact-key">Cost as Nomad/Mo:</span> &#36 ${cityData.cost_as_nomad_us}</h3>
      <h3 class="city-fact"><span class="city-fact-key">Cost in ShortTerm/Mo:</span> &#36 ${cityData.cost_shortterm_us}</h3>
      <h3 class="city-fact"><span class="city-fact-key">Cost in Longterm/Mo:</span> &#36 ${cityData.cost_longterm_us}</h3>
      <h3 class="city-fact"><span class="city-fact-key">Cost (Median) of Air BnB:</span> &#36 ${cityData.air_bnb_median_us}</h3>
      <h3 class="city-fact"><span class="city-fact-key">Air BnB vs Apartment Price Ratio:</span> ${cityData.air_bnb_vs_appartment_price_ratio}</h3>
    </section>
  `)
  var dataArr = [5, 20, 50, 60]
  var width = 300
  var height = 300

  // var widthScale = d3.scale.linear()
  var widthScale = d3.scaleLinear()
    .domain([0, 80]) //smallest, largest value in data set
    .range([0, width]);

  var color = d3.scaleLinear()
    .domain([0, 60])
    .range(["red", "blue"])

  // var axis = d3.svg.axis()
  var axis = d3.axisBottom()
    .tickArguments(3) //specifies how many ticks on scale show up
    .tickSize(10)
    .scale(widthScale);

  var canvas = d3.select(".current-country-data")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(20, 20)")
    // .call(axis) // call the axis to render

  var bars = canvas.selectAll("rect")
    .data(dataArr)
    .enter() //contains placeholders for each data point where there are non DOM elements (aka, returns 3 placeholders)
    .append("rect")
    .attr("width", function(d) { return widthScale(d); })
    .attr("height", 30)
    .attr("fill", function(d) { return color(d); })
    .attr("y", function(d, i) { return i * 40; })

  canvas.append("g")
    .attr("transform", "translate(0, 160)")
    .call(axis)
  }






map.insert("path", ".graticule")
  .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
  .attr("class", "boundary")
  .attr("d", path);
};

d3.select(self.frameElement).style("height", height + "px");
