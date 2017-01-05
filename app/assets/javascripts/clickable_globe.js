    var width = 950,
      height = 700;

    var colors = { clickable: 'darkgrey', hover: 'grey', clicked: "red", clickhover: "darkred" };

    var projection = d3.geoOrthographic()
      .scale(300)
      .translate([width / 2, height / 2])
      .clipAngle(90)
      .precision(10);

    var path = d3.geoPath()
      .projection(projection);

    var graticule = d3.geoGraticule();

    var map = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("class", "map");

    map.append("defs").append("path")
      .datum({type: "Sphere"})
      .attr("id", "sphere")
      .attr("d", path);

    map.append("use")
      .attr("class", "stroke")
      .attr("xlink:href", "#sphere");

    map.append("use")
      .attr("class", "fill")
      .attr("xlink:href", "#sphere");

    map.append("path")
      .datum(graticule)
      .attr("class", "graticule")
      .attr("d", path);

    // var world110m = {};
    // var tsv_fullData = {};

    $.ajax({
      method: 'GET',
      url: '/world_data',
      async: true,
      dataType: 'json',
      success: function(world_data) {
        // world110m = world_data;
        // console.log(world_data)
        ready(world_data[0], world_data[1])
      }
    })//.then(console.log("json", world110m))
    // $.ajax({
    //   method: 'GET',
    //   async: true,
    //   url: 'http://localhost:3000/tsv_data',
    //   success: function(tsv_data) {
    //     // tsv_fullData = tsv_data;
    //     ready(world_data, tsv_data)
    //     console.log('test')
    //   }
    // })
    // //.then(function() {
    //     .then(console.log("tsv", tsv_fullData))
      // console.log("tsv", tsv_fullData)
    // })
    // console.log("json", world110m)
    // d3.json("world-110m.json", function(data) {
    //   console.log('json', data);
    // });
    //
    // d3.tsv("world-country-names.tsv", function(data) {
    //   console.log('tsv', data);
    // });

    // d3.tsv("./world-country-names.tsv", function(data) {
    //   console.log("d3 tsv reader", data[0]);
    // });


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
        console.log('1', countries)
      countries = countries.filter(function(d) {
        return names.some(function(n) {
          debugger;
          if (d.id == n.id) return d.name = n.name;
        });
      }).sort(function(a, b) {
        // debugger;
        return a.name.localeCompare(b.name);
      });
      console.log('2', countries)

      map.insert("path", ".graticule")
        .datum(topojson.feature(world, world.objects.land))
        .attr("class", "land")
        .attr("d", path);

      for(i = 0; i < names.length; i++) {
        // debugger;
        for (j = 0; j < countries.length; j++) {
          if (countries[j].id == names[i].id) {
            map.insert("path", ".graticule")
              .datum(countries[j])
              .attr("fill", colors.clickable)
              .attr("d", path)
              .attr("class", "clickable")
              .attr("data-country-id", j)
              .on("click", function() {
                // ajaxCountryDataCall()
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
              .on("mousemove", function() {
                // debugger
                var c = d3.select(this);
                if (c.classed("clicked")) {
                  c.attr("fill", colors.clickhover);
                } else {
                  c.attr("fill", colors.hover);
                }
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

      map.insert("path", ".graticule")
        .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
        .attr("class", "boundary")
        .attr("d", path);
      // debugger
    };

    d3.select(self.frameElement).style("height", height + "px");
