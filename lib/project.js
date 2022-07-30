var w = 700;
var h = 500;
var barPadding = 3;
var padding = 40;
var parseTime = d3.timeParse("%Y");
var formatTime = d3.timeFormat("%Y");

var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

var rowConverter = function(d) {
    return {
        year: parseTime(d.year),
        total: +d.running_total
    };
}