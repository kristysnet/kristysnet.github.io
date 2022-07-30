var margin = {top: 20, right: 20, bottom: 20, left: 20},
    w = 500 - margin.left - margin.right,
    h = 300 - margin.top - margin.bottom;

var barPadding = 3;
var padding = 40;
var svg = d3.select("#d3-barchart-vis")
    .append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 " + w + " " + h);

var parseTime = d3.timeParse("%Y");

var rowConverter = function(d) {
    return {
        year: parseTime(d.year),
        population: +d.population
    }
}

d3.dsv(",", "https://kristysnet.github.io/lib/data.csv").then(function(dataset) {
    xScale = d3.scaleBand()
        .domain(dataset.map(d => parseTime(d.year).getFullYear()))
        .rangeRound([padding, w])
        .paddingInner(0.1)
        .paddingOuter(0.1);

    // console.log(d3.min(dataset, function(d) { return d.population; }));
    yScale = d3.scaleLinear()
        .domain([0, 20])
        .range([h - padding, padding]);

    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function(d) { return xScale(parseTime(d.year).getFullYear()); })
        .attr("y", function(d) { return yScale(d.population); })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) { return h - padding - yScale(d.population); })
        .attr("fill", "teal")
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut);

    // Add the x Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (h - padding) + ")")
        .call(xAxis);

    // Label for x Axis
    svg.append("text")
        .attr("transform", "translate(" + (w/2) + " ," + (h-10) + ")")
        .style("text-anchor", "middle")
        .style("font-size", "12px")
        .text("Year");

    // Add the y Axis
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + padding + ",0)")
        .call(yAxis);

    // Label for y Axis
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -(h/2))
        .attr("y", 10)
        .style("text-anchor", "middle")
        .style("font-size", "12px")
        .text("Population");

    svg.append("text")
        .attr("x", w/2)
        .attr("y", padding)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Awesome Barchart");

    function handleMouseOver(d, i) {
        d3.select(this)
            .attr("fill", "red");
    }

    function handleMouseOut(d, i) {
        d3.select(this)
            .attr("fill", "teal");
    }
});