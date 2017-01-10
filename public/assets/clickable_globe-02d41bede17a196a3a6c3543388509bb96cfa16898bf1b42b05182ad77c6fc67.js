"use strict";function renderWorld(t,a){function e(t,a){t.d3_id==a&&($("#country-name-title").text(""),$("#country-name-title").append("\n          <h1>"+t.name+"</h1>\n        "),$(".current-country-data").append('\n          <section class="country-facts-countainer">\n            <h3 class="country-fact capital"><span class="fact-title">Capital:</span> '+t.capital+'</h2>\n            <h3 class="country-fact"><span class="fact-title">Population:</span> '+t.population+'</h3>\n            <h3 class="country-fact"><span class="fact-title">Languages:</span> '+t.languages+'</h3>\n            <fieldset>\n              <legend><span class="fact-title h-background-title">Historical Background:</span></legend>\n              <textarea id="country-background">'+t.background+'</textarea>\n            </fieldset>\n            <h3 class="country-fact"><span class="fact-title">Government Type:</span> '+t.government_type+'</h3>\n            <h3 class="country-fact"><span class="fact-title">Dual Citizenship:</span> '+(1==t.dual_citizenship?t.dual_citizenship:"N/A")+'</h3>\n            <h3 class="country-fact"><span class="fact-title">Residency Requirement:</span> '+t.residency_requirement+'</h3>\n\n            <h3 class="country-fact"><span class="fact-title">Urbanization:</span> '+t.urbanization+'</h3>\n            <h3 class="country-fact"><span class="fact-title">Net Migration Rate:</span> '+t.net_migration_rate+'</h3>\n            <h3 class="country-fact"><span class="fact-title">GDP/Capita:</span> '+t.gdp_per_capita+'</h3>\n            <h3 class="country-fact"><span class="fact-title">Unemployment_rate:</span> '+t.unemployment_rate+'</h3>\n            <h3 class="country-fact"><span class="fact-title">Population Below Poverty Line:</span> '+t.population_below_poverty_line+'</h3>\n\n            <h3 class="country-fact"><span class="fact-title">Median Age:</span> '+t.median_age+'</h3>\n            <h3 class="country-fact"><span class="fact-title">Sex Ratio:</span> '+t.sex_ratio+'</h3>\n            <h3 class="country-fact"><span class="fact-title">Ethnic Breakdown:</span> '+t.ethnic_breakdown+'</h3>\n            <h3 class="country-fact"><span class="fact-title">Religions:</span> '+t.religions+'</h3>\n\n            <h3 class="country-fact"><span class="fact-title">Climate:</span> '+t.climate+'</h3>\n            <h3 class="country-fact"><span class="fact-title">Coastline:</span> '+t.coastline+'</h3>\n            <h3 class="country-fact"><span class="fact-title">Environment:</span> '+t.environment+'</h3>\n            <h3 class="country-fact"><span class="fact-title">Natural Resources:</span> '+t.natural_resources+'</h3>\n            <h3 class="country-fact"><span class="fact-title">Exports:</span> '+t.exports+"</h3>\n\n          </section>\n        "))}var t=JSON.parse(t),a=d3.tsvParse(a),n=(topojson.feature(t,t.objects.land),topojson.feature(t,t.objects.countries).features);topojson.mesh(t,t.objects.countries,function(t,a){return t!==a});n=n.filter(function(t){return a.some(function(a){if(t.id==a.id)return t.name=a.name})}).sort(function(t,a){return t.name.localeCompare(a.name)}),map.insert("path",".graticule").datum(topojson.feature(t,t.objects.land)).attr("class","land").attr("d",path);for(var c=0;c<a.length;c++)for(var r=0;r<n.length;r++)n[r].id==a[c].id&&map.insert("path",".graticule").datum(n[r]).attr("fill",colors.clickable).attr("d",path).attr("class","clickable").attr("world110-country-id",r).attr("database-id",a[c].id).on("click",function(){var t=$(this).attr("database-id");$(".current-country-data").text(""),$.ajax({method:"GET",url:"http://corre1ator.herokuapp.com/api/v1/countries/"+t,async:!0,dataType:"json",success:function(a){e(a,t)}}),d3.selectAll(".clicked").classed("clicked",!1).attr("fill",colors.clickable),d3.select(this).classed("clicked",!0).attr("fill",colors.clicked),function(){d3.select(".clicked").transition().duration(1250).tween("rotate",function(){var t=d3.geoCentroid(n[d3.select(this).attr("world110-country-id")]),a=d3.interpolate(projection.rotate(),[-t[0],-t[1]]);return function(t){projection.rotate(a(t)),map.selectAll("path").attr("d",path)}})}()}).on("mousemove",function(t){var a=d3.select(this);a.classed("clicked")?a.attr("fill",colors.clickhover):a.attr("fill",colors.hover);var e=d3.mouse(map.node()).map(function(t){return parseInt(t)});tooltip.classed("hidden",!1).attr("style","left:"+(e[0]-11)+"px; top:"+(e[1]+260)+"px").html(t.name)}).on("mouseout",function(){var t=d3.select(this);t.classed("clicked")?t.attr("fill",colors.clicked):d3.select(this).attr("fill",colors.clickable)});map.insert("path",".graticule").datum(topojson.mesh(t,t.objects.countries,function(t,a){return t!==a})).attr("class","boundary").attr("d",path)}var width=450,height=450,colors={clickable:"black",hover:"tomato",clicked:"orange",clickhover:"darkorange"},projection=d3.geoOrthographic().scale(width/2).translate([width/2,height/2]).clipAngle(90).precision(10),path=d3.geoPath().projection(projection),graticule=d3.geoGraticule(),map=d3.select("#globe_nav_container").append("svg").attr("width",width).attr("height",height).attr("class","map"),tooltip=d3.select("#globe_nav_container").append("div").attr("class","hidden tooltip");map.append("defs").append("path").datum({type:"Sphere"}).attr("id","sphere").attr("d",path),$("#country-name-title").append("\n  <h2>Select a Country<h2>\n"),$(".current-country-data").append('\n  <section>\n    <h3 id="instructions-title">Click a Country to View Its Data</h3>\n    <p id="instructions">\n      Once you\'ve chosen a country, click on available cities. You will be able to view a Country\'s demographic information based on the <a href="https://www.cia.gov/library/publications/the-world-factbook/" target="_blank">CIA World Factbook.</a> Once you click on a country, you can view a respective city\'s "livability" ratings courtesty of <a href="https://nomadlist.com/" target="_blank">NomadList</a>.\n    </p>\n  </sectin>\n');var world_topo="",country_names="";$.ajax({method:"GET",url:"/world_data",async:!0,dataType:"json",success:function(t){world_topo=t[0],country_names=t[1],renderWorld(t[0],t[1])}}),$("#zoom-in").on("click",function(){projection=d3.geoOrthographic().scale(400).translate([width/2,height/2]).clipAngle(90).precision(10),map.append("defs").append("path").datum({type:"Sphere"}).attr("id","sphere").attr("d",path),console.log("hello"),renderWorld(world_topo,country_names)}),d3.select(self.frameElement).style("height",height+"px");var data=[10,50,80],innerRadius=90,outerRadius=120,color=d3.scaleOrdinal().range(["red","blue","orange"]),canvas=d3.select("#donut-chart").append("svg").attr("width",350).attr("height",350),group=canvas.append("g").attr("transform","translate(175, 175)"),arc=d3.arc().innerRadius(innerRadius).outerRadius(outerRadius),pie=d3.pie().value(function(t){return t}),arcs=group.selectAll(".arc").data(pie(data)).enter().append("g").attr("class","arc");arcs.append("path").attr("d",arc).attr("fill",function(t){return color(t.data)}),arcs.append("text").attr("transform",function(t){return"translate("+arc.centroid(t)+")"}).attr("text-anchor","middle").attr("font-size","1.1em").attr("fill","white").text(function(t){return t.data});var dataArr=[5,20,50,60],width=300,height=300,widthScale=d3.scaleLinear().domain([0,80]).range([0,width]),color=d3.scaleLinear().domain([0,60]).range(["red","blue"]),axis=d3.axisBottom().tickArguments(3).tickSize(10).scale(widthScale),canvas=d3.select("#bar-chart").append("svg").attr("width",width).attr("height",height).append("g").attr("transform","translate(20, 20)"),bars=canvas.selectAll("rect").data(dataArr).enter().append("rect").attr("width",function(t){return widthScale(t)}).attr("height",30).attr("fill",function(t){return color(t)}).attr("y",function(t,a){return 40*a});canvas.append("g").attr("transform","translate(0, 160)").call(axis);