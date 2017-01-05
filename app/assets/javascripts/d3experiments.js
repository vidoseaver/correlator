//= require d3

// var dataArr = [5, 20, 50, 60]
// var width = 500
// var height = 500
//
// var widthScale = d3.scale.linear()
//   .domain([0, 60]) //smallest, largest value in data set
//   .range([0, width]);
//
// var color = d3.scale.linear()
//   .domain([0, 60])
//   .range(['red', 'blue'])
//
// var axis = d3.svg.axis()
//   .ticks(5) //specifies how many ticks on scale show up
//   .scale(widthScale);
//
// var canvas = d3.select('body')
//   .append('svg')
//   .attr('width', width)
//   .attr('height', height)
//   .append('g')
//   .attr('transform', 'translate(20, 20)')
//   // .call(axis) // call the axis to render
//
// var bars = canvas.selectAll('rect')
//   .data(dataArr)
//   .enter() //contains placeholders for each data point where there are non DOM elements (aka, returns 3 placeholders)
//     .append('rect')
//     .attr('width', function(d) { return widthScale(d); })
//     .attr('height', 50)
//     .attr('fill', function(d) { return color(d); })
//     .attr('y', function(d, i) { return i * 70; })
//
//   canvas.append('g')
//     .attr('transform', 'translate(0, 300)')
//     .call(axis)

// ________________________________

    // DOM elements < data elements (enter)
    // DOM elements > data elements (exit)
    // DOM elements = data elements (update)

// ________________________________

// var canvas = d3.select('body')
//         .append('svg')
//         .attr('width', 500)
//         .attr('height', 500)
//
//       var circle = canvas.append('circle')
//           .attr('cx', 50)
//           .attr('cy', 100)
//           .attr('r', 25);
//
//       circle.transition()
//         .duration(1500)
//         .delay(100)
//         .attr('cx', 150)
//         .transition()
//         .attr('cy', 200)
//         .transition()
//         .attr('cx', 50)
//         .each('end', function() { d3.select(this).attr('fill', 'red'); }) //event listener, listening for the end of the transition

// ________________________________

    // data = [20, 30, 40, 50]

    // data.sort(d3.descending); // [50, 40, 30, 20]
    // d3.min(data) //10
    // d3.max(data) //50
    // d3.extent(data) //[10, 50]
    // d3.sum(data) //150
    // d3.mean(data) //30
    // d3.median(data) //30
    // d3.shuffle(data) // randomizes order of data


    // $.ajax({
    //   type: "GET",
    //   contentType: "application/json; charset=utf-8",
    //   url: 'http://corre1ator.herokuapp.com/api/v1/cities/1',
    //   dataType: 'json',
    //   async: true,
    //   data: "{}",
    //   success: function (data) {
    //     var cityData = data;
    //     drawBarGraph(cityData);
    //   },
    //   error: function (result) {
    //     console.log('failed request, biotch!')
    //     }
    //   })
    //

    // ________________________________

    // console.log("test")

    // var people = [
    //   {"name": "Maria", "age": 30},
    //   {"name": "Fred", "age": 50},
    //   {"name": "Francis", "age": 12}
    // ]
    //
    // // console.log(data);
    // // d3.json("../../../public/mydata.json", function(data) {
    // // d3.json("../../../public/mydata.json", function(data) {
    // // $.get("../../../public/mydata.json", function(data) {
    //
    // var url = "../../../public/mydata.json";
    //
    // d3.json(url, function(error, data) {
    //
    //   var canvas = d3.select('body').append('svg')
    //     .attr('width', 500)
    //     .attr('height', 500)
    //
    //   canvas.selectAll('rect')
    //     .data(data)
    //     .enter()
    //       .append('rect')
    //       .attr('width', function(d) { return d.age * 10 })
    //       .attr('height', 48)
    //       .attr('y', function(d, i) { return i * 50; })
    //       .attr('fill', 'blue')
    //
    //   canvas.selectAll('text')
    //     .data(data)
    //     .enter()
    //       .append('text')
    //       .attr('fill', 'white')
    //       .attr('y', function(d, i) { return i * 50 + 24; })
    //       .attr(function(d) { return d.name; });
    //
    //   }) //path to data file, callback

    // ________________________________

    // var canvas = d3.select('body').append('svg')
    //   .attr('width', 300)
    //   .attr('height', 500);
    //
    // var data = [
    //   {x: 10, y: 20}
    //   {x: 40, y: 60}
    //   {x: 50, y: 70}
    // ];
    //
    // var group = canvas.append('g')
    //   .attr('transform', 'translate(100, 1000)');
    //
    // var line = d3.svg.line()
    //   .x(function(d) { return d.x })
    //   .y(function(d) { return d.y });
    //
    // group.selectAll('path')
    //   .data([data])
    //   .enter()
    //   .append('path')
    //   .attr('d', line)
    //   .attr('fill', 'none')
    //   .attr('stroke', '#000')
    //   .attr('stroke-width', 10)

    // ________________________________

// var width = 950,
//     height = 700;
//
// var colors = { clickable: 'darkgrey', hover: 'grey', clicked: "red", clickhover: "darkred" };
//
// var projection = d3.geo.orthographic()
//     .scale(300)
//     .translate([width / 2, height / 2])
//     .clipAngle(90)
//     .precision(10);
//
// var path = d3.geo.path()
//     .projection(projection);
//
// var graticule = d3.geo.graticule();
//
// var map = d3.select("body").append("svg")
//     .attr("width", width)
//     .attr("height", height)
//     .attr("class", "map");
//
// map.append("defs").append("path")
//     .datum({type: "Sphere"})
//     .attr("id", "sphere")
//     .attr("d", path);
//
// map.append("use")
//     .attr("class", "stroke")
//     .attr("xlink:href", "#sphere");
//
// map.append("use")
//     .attr("class", "fill")
//     .attr("xlink:href", "#sphere");
//
// map.append("path")
//     .datum(graticule)
//     .attr("class", "graticule")
//     .attr("d", path);
//
// queue()
//     .defer(d3.json, "./world-110m.json")
//     .defer(d3.tsv, "./world-country-names.tsv")
//     .await(ready);
//
// function ready(error, world, names) {
//   debugger;
//   if (error) throw error;
//
//   var globe = {type: "Sphere"},
//     land = topojson.feature(world, world.objects.land),
//     countries = topojson.feature(world, world.objects.countries).features,
//     borders = topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; });
//
//   countries = countries.filter(function(d) {
//     return names.some(function(n) {
//       if (d.id == n.id) return d.name = n.name;
//     });
//   }).sort(function(a, b) {
//     return a.name.localeCompare(b.name);
//   });
//
//   map.insert("path", ".graticule")
//       .datum(topojson.feature(world, world.objects.land))
//       .attr("class", "land")
//       .attr("d", path);
//
//   for(i = 0; i < names.length; i++) {
//     for (j = 0; j < countries.length; j++) {
//       if (countries[j].id == names[i].id) {
//         map.insert("path", ".graticule")
//           .datum(countries[j])
//           .attr("fill", colors.clickable)
//           .attr("d", path)
//           .attr("class", "clickable")
//           .attr("data-country-id", j)
//           .on("click", function() {
//             d3.selectAll(".clicked")
//               .classed("clicked", false)
//               .attr("fill", colors.clickable);
//             d3.select(this)
//               .classed("clicked", true)
//               .attr("fill", colors.clicked);
//
//             (function transition() {
//               d3.select(".clicked").transition()
//               .duration(1250)
//               .tween("rotate", function() {
//                 var p = d3.geo.centroid(countries[d3.select(this).attr("data-country-id")]),
//                     r = d3.interpolate(projection.rotate(), [-p[0], -p[1]]);
//                 return function (t) {
//                   projection.rotate(r(t));
//                   map.selectAll("path").attr("d", path);
//                 }
//               });
//             })();
//           })
//           .on("mousemove", function() {
//             var c = d3.select(this);
//             if (c.classed("clicked")) {
//               c.attr("fill", colors.clickhover);
//             } else {
//               c.attr("fill", colors.hover);
//             }
//           })
//           .on("mouseout", function() {
//             var c = d3.select(this);
//             if (c.classed("clicked")) {
//               c.attr("fill", colors.clicked);
//             } else {
//               d3.select(this).attr("fill", colors.clickable);
//             }
//           });
//       }
//     }
//   }
//
//   map.insert("path", ".graticule")
//       .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
//       .attr("class", "boundary")
//       .attr("d", path);
// };
//
// d3.select(self.frameElement).style("height", height + "px");
