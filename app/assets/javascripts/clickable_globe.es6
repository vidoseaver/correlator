// function renderWorldMap(height, width, scale) {
//   let projection = d3.geoOrthographic()
//     .scale(scale)
//     .translate([width / 2, height / 2])
//     .clipAngle(90)
//     .precision(10);
//
//   let path = d3.geoPath()
//     .projection(projection);
//
//
//   //
//
//   renderMap();
// }
//
//
// renderWorldMap(450, 450, 400);
//
//
// $('#zoom-in').click(e => {
//   renderWorldMap(300, 300, 300);
// })
//
//
//
// // responsiveness
// detect browser dimensions in javascript
// if ($(window).width() < 450) {
// renderWorldMap(310, 310, 155);
// } else {
// renderWorldMap(450, 450, 225);
// }



var width = 450,
    height = 450;

var colors = { clickable: "black", hover: "tomato", clicked: "orange", clickhover: "darkorange" };

var projection = d3.geoOrthographic()
  // .scale(400)
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

//APPENDS COLORING (OUTER-COUNTRY FILL)
// map.append("use")
//   .attr("class", "fill")
//   .attr("xlink:href", "#sphere");

// APPENDS GRIDLINES
map.append("path")
  .datum(graticule)
  .attr("class", "graticule")
  .attr("d", path);

$("#country-name-title").append(`
  <h2>Select a Country<h2>
`)

$(".current-country-data").append(`
  <section class="instructions-section">
    <h3 id="instructions-title">Click a Country to View Its Data</h3>
    <p id="instructions">
      Once you've chosen a country, click on available cities. You will be able to view a Country's demographic information based on the <a href="https://www.cia.gov/library/publications/the-world-factbook/" target="_blank">CIA World Factbook.</a> Once you click on a country, you can view a respective city's "livability" ratings courtesty of <a href="https://nomadlist.com/" target="_blank">NomadList</a>.
    </p>
  </sectin>
`)

// var world_topo = "";
// var country_names = "";

$.ajax({
  method: "GET",
  url: "/world_data",
  async: true,
  dataType: "json",
  success: function(world_data) {
    // world_topo = world_data[0];
    // country_names = world_data[1];
    renderWorld(world_data[0], world_data[1])
  }
})

// __________

$("#zoom-in").on("click", function() {
  // projection
  //   .scale(400)
  //   .translate()
  //   .clipAngle()


  projection = d3.geoOrthographic()
    .scale(400)
    .translate([width / 2, height / 2])
    .clipAngle(90)
    .precision(10);
  map.append("defs")
    .append("path")
    .datum({type: "Sphere"})
    .attr("id", "sphere")
    .attr("d", path);
    console.log('hello')
    // console.log(world_topo)
    // console.log(country_names)

  renderWorld(world_topo, country_names)
})

// $("#zoom-out").on("click", function() {
//   projection = d3.geoOrthographic()
//     .scale(width / 2)
//     .translate([width / 2, height / 2])
//     .clipAngle(90)
//     .precision(10);
// })

// __________
// window.addEventListener("resize", resize);

// d3.select(window)
// 	.on("resize", resize);
//
// function resize() {
//   d3.select("#globe_nav_container").attr("transform", "scale(" + $("#globe_container").width()/900 + ")");
//   $("#globe_nav_container").height($("#globe_container").width()*0.618);
// }
  // __________

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
              var databaseCountryID = $(this).attr("database-id")

              $(".current-country-data").text("")
              $.ajax({
                method: "GET",
                url: `/api/v1/countries/${databaseCountryID}`,
                async: true,
                dataType: "json",
                success: function(clickedCountry) {
                  renderCountryData(clickedCountry, databaseCountryID)
                }
              })
              // $.ajax({
              //   method: "GET",
              //   url: `/api/v1/country_cities/database/${databaseCountryID}`,
              //   async: true,
              //   dataType: "json",
              //   success: function(clickedCountryCities) {
              //
              //     renderCityData(clickedCountryCities, databaseCountryID)
              //   }
              // })

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
          <h1>${clickedCountry.name}</h1>
        `)

        $(".current-country-data").append(`
          <section class="country-facts-container">
            <h3 class="country-fact capital"><span class="fact-title">Capital:</span> ${clickedCountry.capital}</h3>
            <h3 class="country-fact"><span class="fact-title">Population:</span> ${clickedCountry.population}</h3>
            <h3 class="country-fact"><span class="fact-title">Languages:</span> ${clickedCountry.languages}</h3>
            <fieldset>
              <legend><span class="fact-title h-background-title">Historical Background:</span></legend>
              <textarea id="country-background">${clickedCountry.background}</textarea>
            </fieldset>
            <h3 class="country-fact"><span class="fact-title">Government Type:</span> ${clickedCountry.government_type}</h3>
            <h3 class="country-fact"><span class="fact-title">Dual Citizenship:</span> ${clickedCountry.dual_citizenship == !undefined ? clickedCountry.dual_citizenship : "N/A"}</h3>
            <h3 class="country-fact"><span class="fact-title">Residency Requirement:</span> ${clickedCountry.residency_requirement}</h3>

            <h3 class="country-fact"><span class="fact-title">Urbanization:</span> ${clickedCountry.urbanization}</h3>
            <h3 class="country-fact"><span class="fact-title">Net Migration Rate:</span> ${clickedCountry.net_migration_rate}</h3>
            <h3 class="country-fact"><span class="fact-title">GDP/Capita:</span> ${clickedCountry.gdp_per_capita}</h3>
            <h3 class="country-fact"><span class="fact-title">Unemployment_rate:</span> ${clickedCountry.unemployment_rate}</h3>
            <h3 class="country-fact"><span class="fact-title">Population Below Poverty Line:</span> ${clickedCountry.population_below_poverty_line}</h3>

            <h3 class="country-fact"><span class="fact-title">Median Age:</span> ${clickedCountry.median_age}</h3>
            <h3 class="country-fact"><span class="fact-title">Sex Ratio:</span> ${clickedCountry.sex_ratio}</h3>
            <h3 class="country-fact"><span class="fact-title">Ethnic Breakdown:</span> ${clickedCountry.ethnic_breakdown}</h3>
            <h3 class="country-fact"><span class="fact-title">Religions:</span> ${clickedCountry.religions}</h3>

            <h3 class="country-fact"><span class="fact-title">Climate:</span> ${clickedCountry.climate}</h3>
            <h3 class="country-fact"><span class="fact-title">Coastline:</span> ${clickedCountry.coastline}</h3>
            <h3 class="country-fact"><span class="fact-title">Environment:</span> ${clickedCountry.environment}</h3>
            <h3 class="country-fact"><span class="fact-title">Natural Resources:</span> ${clickedCountry.natural_resources}</h3>
            <h3 class="country-fact"><span class="fact-title">Exports:</span> ${clickedCountry.exports}</h3>

          </section>
        `)
      }
    }

    // function renderCityData(clickedCountryCities, databaseCountryID) {
    //   console.log('country d3 id', clickedCountryCities.d3_id)
    //   console.log('databaseCountryID', clickedCountryCities.d3_id)
    //   console.log('city liest', clickedCountryCities.city)
    //   if (clickedCountryCities.d3_id == databaseCountryID) {
    //     $(".current-country-data").append(`
    //       <section class="city-name-container">
    //         <h3 class="city-name-list"><span class="city-title">Cities:</span></h2>
    //     `)
    //     //  ${clickedCountryCities.city}
    //   }
    // }

  map.insert("path", ".graticule")
    .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
    .attr("class", "boundary")
    .attr("d", path);
};

d3.select(self.frameElement).style("height", height + "px");














// __________________________________________________
// DONUT CHART PROTOTYPE

var data = [10, 50, 80];
var innerRadius = 90; //set the inner radius to 0 to make a PIE CHART
var outerRadius = 120;

var color = d3.scaleOrdinal()
.range(["red", "blue", "orange"])

var canvas = d3.select("#donut-chart").append("svg")
.attr("width", 350)
.attr("height", 350);

var group = canvas.append("g")
.attr("transform", "translate(175, 175)");

// var arc = d3.svg.arc()
var arc = d3.arc()
// .scale(175)
.innerRadius(innerRadius)
.outerRadius(outerRadius);

// var pie = d3.layout.pie()
var pie = d3.pie()
.value(function (d) { return d; }); // specifies how the layout fetches data: "d" refers to the arc generator for the data array above
//see this get passed below (.data(pie(data)))

var arcs = group.selectAll(".arc") //binds data to docs
.data(pie(data)) // pass data to pie layout, then bind it to the selection of "arc"
.enter()
.append("g") //appends a group for each data element
.attr("class", "arc");

//make a path out of the above
// pie(data) =>
// Array[3]0: Objectdata: 10endAngle: 6.283185307179586padAngle: 0startAngle: 5.834386356666759value: 10__proto__: Object1: Object2: Objectdata: 80endAngle: 3.5903916041026207padAngle: 0startAngle: 0value: 80__proto__: Objectlength: 3__proto__: Array[0]

arcs.append("path") //path generator
.attr("d", arc)
.attr("fill", function(d) { return color(d.data); });

arcs.append("text")
.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
.attr("text-anchor", "middle")
.attr("font-size", "1.1em")
.attr("fill", "white")
.text(function(d) { return d.data; });

// __________________________________________________
// BAR CHART PROTOTYPE
// WITH CHANGING COLORS

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

var canvas = d3.select("#bar-chart")
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
