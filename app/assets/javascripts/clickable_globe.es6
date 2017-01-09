// var margin = {top: 10, left: 10, bottom: 10, right: 10},
var margin = 10,
    width = parseInt(d3.select('#globe_nav_container').style('width')),
    width = width - margin - margin,
    mapRatio = .5,
    height = width * mapRatio;

//
var width = 400,
    height = 400;
// var width = 950,
//     height = 700;

var colors = { clickable: "black", hover: "tomato", clicked: "orange", clickhover: "darkorange" };

// window.addEventListener("resize", resize);

// d3.select(window)
// 	.on("resize", resize);
//
// function resize() {
//   d3.select("g").attr("transform", "scale(" + $("#globe_container").width()/900 + ")");
//   $("svg").height($("#globe_container").width()*0.618);
// }

var projection = d3.geoOrthographic()
  .scale(width / 2)
  // .scale(175)
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

  // .append("g")
  //   .call(d3.zoom().on("zoom", function() {
  //     map.attr(zoom)
  //   }))
  // .append("g");

var tooltip = d3.select("#globe_nav_container")
  .append("div")
  .attr("class", "hidden tooltip");

// var g = map.append("g");

map.append("defs")
  .append("path")
  .datum({type: "Sphere"})
  .attr("id", "sphere")
  .attr("d", path);

//APPENDS OUTER GLOBE BORDER
// map.append("use")
//   .attr("class", "stroke")
//   .attr("xlink:href", "#sphere");

//APPENDS COLORING (OUTER-COUNTRY FILL)
// map.append("use")
//   .attr("class", "fill")
//   .attr("xlink:href", "#sphere");

// APPENDS GRIDLINES
map.append("path")
  .datum(graticule)
  .attr("class", "graticule")
  .attr("d", path);

d3.select(window).on('resize', resizeGlobe);

function resizeGlobe() {
    // adjust things when the window size changes
    width = parseInt(d3.select('#globe_nav_container').style('width'));
    width = width - margin.left - margin.right;
    height = width * mapRatio;

    // update projection
    projection
      .translate([width / 2, height / 2])
      .scale(width);

    // resize the map container
    map
      .style('width', width + 'px')
      .style('height', height + 'px');

    // resize the map
    map.select('.land').attr('d', path);
    map.selectAll('.state').attr('d', path);
}

$.ajax({
  method: "GET",
  url: "/world_data",
  async: true,
  dataType: "json",
  success: function(world_data) {
    ready(world_data[0], world_data[1])
  }
})

// d3.queue()
//   .defer(d3.json, "world-110m.json")
//   .defer(d3.tsv, "world-country-names.tsv")
//   .await(ready);

function ready(world, names) {
  // debugger;
  // if (error) throw error;
  var world = JSON.parse(world)
  var names = d3.tsvParse(names)
  // debugger;
  // console.log(names)

  var globe = {type: "Sphere"},
    land = topojson.feature(world, world.objects.land),
    countries = topojson.feature(world, world.objects.countries).features,
    borders = topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; });
    // console.log("1", countries)
  countries = countries.filter(function(d) {
    return names.some(function(n) {
      // debugger;
      if (d.id == n.id) return d.name = n.name;
    });
  }).sort(function(a, b) {
    // debugger;
    return a.name.localeCompare(b.name);
  });
  // console.log("# of countries", countries.length)

  map.insert("path", ".graticule")
    .datum(topojson.feature(world, world.objects.land))
    .attr("class", "land")
    .attr("d", path);

    for(var i = 0; i < names.length; i++) {
      for (var j = 0; j < countries.length; j++) {
        // console.log("country id", country[j].id)
        if (countries[j].id == names[i].id) {
          // console.log(countries[j].name)
          // console.log(countries[j].id)
          map.insert("path", ".graticule")
            .datum(countries[j])
            .attr("fill", colors.clickable)
            .attr("d", path)
            .attr("class", "clickable")
            .attr("data-country-id", j)
            .attr("database-id", names[j].id)
            // .on("click", zoomCountry)
            .on("click", function() {
              console.log("clicked country", this)
              // ajaxCountryDataCall()
    // _______________________
    // Integrate CIA Factbook Data
              // $(".current-country-CIA-data").append(
              //   `<p>Hello Country<p>`
              // )

              var clickedCountryID = $(this).attr("database-id")
              // console.log('url', `http://corre1ator.herokuapp.com/api/v1/countries/${clickedCountryID}`)
              //
              $.ajax({
                method: "GET",
                url: `http://corre1ator.herokuapp.com/api/v1/countries/${clickedCountryID}`,
                async: true,
                dataType: "json",
                success: function(clickedCountry) {
                  renderCountryData(clickedCountry, clickedCountryID)
                  // ready(worldData[0], worldData[1])
                // error: console.log(error)
                }
              })

              d3.selectAll(".clicked")
                .classed("clicked", false)
                .attr("fill", colors.clickable);
              d3.select(this)
                .classed("clicked", true)
                .attr("fill", colors.clicked);

              (function transition() {
                // debugger;
                d3.select(".clicked").transition()
                .duration(1250)
                .tween("rotate", function() {
                  var p = d3.geoCentroid(countries[d3.select(this).attr("data-country-id")]),
                      r = d3.interpolate(projection.rotate(), [-p[0], -p[1]]);
                  return function (t) {
                    projection.rotate(r(t));
                    map.selectAll("path").attr("d", path);
                  }


                });
              })();
            })
            .on("mousemove", function(d) {
              // debugger
              var c = d3.select(this);
              if (c.classed("clicked")) {
                c.attr("fill", colors.clickhover);
              } else {
                c.attr("fill", colors.hover);
              }

              // debugger;
              var mouse = d3.mouse(map.node()).map(function(d) {
                return parseInt(d);
              });
              tooltip.classed("hidden", false)
                .attr("style", "left:" + (mouse[0] + 15) +
                  "px; top:" + (mouse[1] - 15) + "px")
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

      // function zoomCountry(d) {
      //   var d, y, k;
      //
      //   if (d && centered !== d) {
      //     var centroid = path.centroid(d);
      //     x = centroid[0];
      //     y = centroid[1];
      //     k = 4;
      //     centered = d;
      //   } else {
      //     x = width / 2;
      //     y = height / 2;
      //     k = 1;
      //     centered = null;
      //   }
      //
      //   map.selectAll("path")
      //     .classed("active", centered && function(d) { return d === centered; });
      //
      //   map.transition()
      //     .duration(750)
      //     .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," -y + ")")
      //     .style("stroke-width", 1.5 / k + "px");
      // }

    // }

    function renderCountryData(clickedCountry, clickedCountryID) {
      // console.log('test')
      // console.log(clickedCountry)
      $(".current-country-data").append(`<h1>HELLLLLLOOOOOOOOO</h1>`);
      // if (clickedCountry.id === clickedCountryID) {
        // $(".current-country-data").append(`
        //   <div class="country-facts-countainer">
        //     <h1>clickedCountry.name</h1>
        //     <h2>Capital: clickedCountry.capital</h2>
        //     <h3>Population: clickedCountry.population</h3>
        //
        //     <h3>Government Type: clickedCountry.government_type</h3>
        //     <h3>Dual Citizenship: clickedCountry.dual_citizenship</h3>
        //     <h3>Residency Requirement: clickedCountry.residency_requirement</h3>
        //     <h5>Net Migration Rate: clickedCountry.net_migration_rate</h5>
        //
        //     <h5>Urbanization: clickedCountry.urbanization</h5>
        //     <h3>GDP/Capita: clickedCountry.gdp_per_capita</h3>
        //     <h5>unemployment_rate: clickedCountry.unemployment_rate</h5>
        //     <h5>Population Below Poverty Line: clickedCountry.population_below_poverty_line</h5>
        //
        //     <h5>Age_structure: clickedCountry.Age_structure</h5>
        //     <h3>Median Age: clickedCountry.median_age</h3>
        //     <h3>Sex Ratio: clickedCountry.sex_ratio</h3>
        //     <h3>Languages: clickedCountry.languages</h3>
        //     <h3>Ethnic Breakdown: clickedCountry.ethnic_breakdown</h3>
        //     <h3>Religions: clickedCountry.religions</h3>
        //
        //     <h5>Climate: clickedCountry.climate</h5>
        //     <h5>Coastlin: clickedCountry.coastline</h5>
        //     <h5>Environment: clickedCountry.environment</h5>
        //     <h5>Natural Resources: clickedCountry.natural_resources</h5>
        //     <label>
        //     <h5>Exports: clickedCountry.exports</h5>
        //     </label>
        //
        //     <label>Historical Background:
        //       <textarea>clickedCountry.background</textarea>
        //     </label>
        //   </div>
        // `
        // )
      // }
    }

  map.insert("path", ".graticule")
    .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
    .attr("class", "boundary")
    .attr("d", path);
  // debugger
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
