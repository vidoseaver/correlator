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

    // // console.log("test")
    //
    // var people = [
    //   {"name": "Maria", "age": 30},
    //   {"name": "Fred", "age": 50},
    //   {"name": "Francis", "age": 12}
    // ]
    //
    // // d3.json("../../../public/mydata.json", function(data) {
    // // $.get("../../../public/mydata.json", function(data) {
    //
    //   var canvas = d3.select('body').append('svg')
    //     .attr('width', 500)
    //     .attr('height', 500)
    //
    //   canvas.selectAll('rect')
    //     .data(people)
    //     .enter()
    //       .append('rect')
    //       .attr('width', function(d) { return d.age * 10 })
    //       .attr('height', 48)
    //       .attr('y', function(d, i) { return i * 50; })
    //       .attr('fill', 'blue')
    //
    //   canvas.selectAll('text')
    //     .data(people)
    //     .enter()
    //       .append('text')
    //       .attr('fill', 'white')
    //       .attr('y', function(d, i) { return i * 50 + 24; })
    //       .attr(function(d) { return d.name; });
    //
    //   // }) //path to data file, callback

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
