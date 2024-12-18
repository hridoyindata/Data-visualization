// Width and height of the map
const mapWidth = 800;
const mapHeight = 600;

// Life expectancy data
const lifeExpectancyData = {
    "1": { male: 80, female: 85, both: 82.5 }, // New South Wales
    "2": { male: 79, female: 84, both: 81.5 }, // Victoria
    "3": { male: 78, female: 83, both: 80.5 }, // Queensland
    "4": { male: 77, female: 82, both: 79.5 }, // South Australia
    "5": { male: 76, female: 81, both: 78.5 }, // Western Australia
    "6": { male: 75, female: 80, both: 77.5 }, // Tasmania
    "7": { male: 74, female: 79, both: 76.5 }, // Northern Territory
    "8": { male: 81, female: 86, both: 83.5 }  // Australian Capital Territory
};

// Health spending data
const healthSpendingData = {
    "1": { state: "New South Wales", spending: 5191 }, // New South Wales
    "2": { state: "Victoria", spending: 4776 }, // Victoria
    "3": { state: "Queensland", spending: 5075 }, // Queensland
    "4": { state: "South Australia", spending: 5037 }, // South Australia
    "5": { state: "Western Australia", spending: 5692 }, // Western Australia
    "6": { state: "Tasmania", spending: 6226 }, // Tasmania
    "7": { state: "Northern Territory", spending: 3854 }, // Northern Territory
    "8": { state: "Australian Capital Territory", spending: 3809 }  // Australian Capital Territory
};

// Cancer incidence data
const cancerIncidenceData = [
    { year: 2000, state: "New South Wales", count: 8523, sex: "both" },
    { year: 2000, state: "Victoria", count: 7891, sex: "both" },
    { year: 2000, state: "Queensland", count: 7321, sex: "both" },
    { year: 2000, state: "South Australia", count: 6457, sex: "both" },
    { year: 2000, state: "Western Australia", count: 5983, sex: "both" },
    { year: 2000, state: "Tasmania", count: 4832, sex: "both" },
    { year: 2000, state: "Northern Territory", count: 3142, sex: "both" },
    { year: 2000, state: "Australian Capital Territory", count: 4098, sex: "both" },
    { year: 2005, state: "New South Wales", count: 6784, sex: "both" },
    { year: 2005, state: "Victoria", count: 7456, sex: "both" },
    { year: 2005, state: "Queensland", count: 6897, sex: "both" },
    { year: 2005, state: "South Australia", count: 6231, sex: "both" },
    { year: 2005, state: "Western Australia", count: 5782, sex: "both" },
    { year: 2005, state: "Tasmania", count: 4795, sex: "both" },
    { year: 2005, state: "Northern Territory", count: 2876, sex: "both" },
    { year: 2005, state: "Australian Capital Territory", count: 3584, sex: "both" },
    { year: 2010, state: "New South Wales", count: 7893, sex: "both" },
    { year: 2010, state: "Victoria", count: 7285, sex: "both" },
    { year: 2010, state: "Queensland", count: 7142, sex: "both" },
    { year: 2010, state: "South Australia", count: 6483, sex: "both" },
    { year: 2010, state: "Western Australia", count: 5961, sex: "both" },
    { year: 2010, state: "Tasmania", count: 4831, sex: "both" },
    { year: 2010, state: "Northern Territory", count: 2935, sex: "both" },
    { year: 2010, state: "Australian Capital Territory", count: 3741, sex: "both" },
    { year: 2015, state: "New South Wales", count: 5123, sex: "both" },
    { year: 2015, state: "Victoria", count: 8684, sex: "both" },
    { year: 2015, state: "Queensland", count: 7891, sex: "both" },
    { year: 2015, state: "South Australia", count: 7457, sex: "both" },
    { year: 2015, state: "Western Australia", count: 5998, sex: "both" },
    { year: 2015, state: "Tasmania", count: 3728, sex: "both" },
    { year: 2015, state: "Northern Territory", count: 3981, sex: "both" },
    { year: 2015, state: "Australian Capital Territory", count: 3429, sex: "both" },
    { year: 2020, state: "New South Wales", count: 7392, sex: "both" },
    { year: 2020, state: "Victoria", count: 3897, sex: "both" },
    { year: 2020, state: "Queensland", count: 5291, sex: "both" },
    { year: 2020, state: "South Australia", count: 8415, sex: "both" },
    { year: 2020, state: "Western Australia", count: 6783, sex: "both" },
    { year: 2020, state: "Tasmania", count: 3598, sex: "both" },
    { year: 2020, state: "Northern Territory", count: 4894, sex: "both" },
    { year: 2020, state: "Australian Capital Territory", count: 6367, sex: "both" }
];

// Define color scales
const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

// Create SVG element for the map
const svgMap = d3.select("#map")
    .append("svg")
    .attr("width", mapWidth)
    .attr("height", mapHeight);

// Define map projection
const projection = d3.geoMercator()
    .center([134, -28]) // Center the map over Australia
    .scale(1000) // Scale to fit
    .translate([mapWidth / 2, mapHeight / 2]);

// Define path generator
const path = d3.geoPath()
    .projection(projection);

// Load GeoJSON data for the map
d3.json("australian-states.json").then(function(australia) {
    // Draw the states
    const states = svgMap.selectAll("path")
        .data(australia.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", "#ccc") // Initial color
        .attr("stroke", "#fff")
        .attr("stroke-width", 1)
        .attr("id", d => `state-${d.properties.STATE_CODE}`)
        .on("mouseover", function(event, d) {
            d3.select(this).attr("stroke-width", 2);
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html(`
                <strong>${d.properties.STATE_NAME}</strong><br>
                Male: ${lifeExpectancyData[d.properties.STATE_CODE].male} years<br>
                Female: ${lifeExpectancyData[d.properties.STATE_CODE].female} years<br>
                Both: ${lifeExpectancyData[d.properties.STATE_CODE].both} years
            `)
                .style("left", (event.pageX + 5) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            d3.select(this).attr("stroke-width", 1);
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });

    // Add state names
    svgMap.selectAll("text")
        .data(australia.features)
        .enter()
        .append("text")
        .attr("x", function(d) { return path.centroid(d)[0]; })
        .attr("y", function(d) { return path.centroid(d)[1]; })
        .attr("text-anchor", "middle")
        .text(function(d) { return d.properties.STATE_NAME; });

    // Add legend with checkboxes and year selector
    const legendData = [
        {color: colorScale("1"), label: "New South Wales", code: "1"},
        {color: colorScale("2"), label: "Victoria", code: "2"},
        {color: colorScale("3"), label: "Queensland", code: "3"},
        {color: colorScale("4"), label: "South Australia", code: "4"},
        {color: colorScale("5"), label: "Western Australia", code: "5"},
        {color: colorScale("6"), label: "Tasmania", code: "6"},
        {color: colorScale("7"), label: "Northern Territory", code: "7"},
        {color: colorScale("8"), label: "Australian Capital Territory", code: "8"}
    ];

    const legend = d3.select("#legend");

    // Add individual state checkboxes
    legend.selectAll("div.state-item")
        .data(legendData)
        .enter()
        .append("div")
        .attr("class", "legend-item state-item")
        .each(function(d) {
            const item = d3.select(this);
            item.append("input")
                .attr("type", "checkbox")
                .attr("class", "state-checkbox")
                .attr("checked", true)
                .attr("id", `checkbox-${d.code}`)
                .on("change", function() {
                    updateMap();
                    updatePieChart();
                    updateScatterPlot();
                });
            item.append("div")
                .attr("class", "legend-rect")
                .style("background-color", d.color);
            item.append("label")
                .attr("for", `checkbox-${d.code}`)
                .text(d.label);
        });

    // Add year selector
    const yearSelector = legend.append("div")
        .attr("class", "year-selector")
        .text("Select Year: ")
        .append("select")
        .attr("id", "year-selector")
        .on("change", function() {
            updateScatterPlot();
        });

    // Populate year options
    const years = [...new Set(cancerIncidenceData.map(d => d.year))];
    yearSelector.selectAll("option")
        .data(years)
        .enter()
        .append("option")
        .attr("value", d => d)
        .text(d => d);

    function updateMap() {
        const checkedStates = legend.selectAll(".state-checkbox")
            .filter(function() { return this.checked; })
            .data()
            .map(d => d.code);

        svgMap.selectAll("path")
            .attr("fill", d => checkedStates.includes(d.properties.STATE_CODE) ? colorScale(d.properties.STATE_CODE) : "#ccc");
    }

    // Add tooltip
    const tooltip = d3.select("#tooltip");

    // Create the pie chart
    const pieChartWidth = 300;
    const pieChartHeight = 400;
    const radius = Math.min(pieChartWidth, pieChartHeight) / 2;

    const pie = d3.pie()
        .value(d => d.value)
        .sort(null);

    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    const pieSvg = d3.select("#pie-chart")
        .append("svg")
        .attr("width", pieChartWidth)
        .attr("height", pieChartHeight)
        .append("g")
        .attr("transform", `translate(${pieChartWidth / 2},${pieChartHeight / 2})`);

    const pieData = legendData.map(d => ({label: d.label, value: healthSpendingData[d.code].spending, color: d.color, code: d.code}));

    function updatePieChart() {
        const checkedStates = legend.selectAll(".state-checkbox")
            .filter(function() { return this.checked; })
            .data()
            .map(d => d.code);

        const filteredPieData = pieData.filter(d => checkedStates.includes(d.code));

        const arcs = pieSvg.selectAll(".arc")
            .data(pie(filteredPieData));

        arcs.enter()
            .append("path")
            .attr("class", "arc")
            .attr("d", arc)
            .attr("fill", d => d.data.color)
            .on("mouseover", function(event, d) {
                tooltip.transition()
                    .duration(0)
                    .style("opacity", .9);
                tooltip.html(`${d.data.label}: $${d.data.value} million`)
                    .style("left", (event.pageX + 5) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        arcs.attr("d", arc)
            .attr("fill", d => d.data.color);

        arcs.exit().remove();

        const labels = pieSvg.selectAll(".label")
            .data(pie(filteredPieData));

        labels.enter()
            .append("text")
            .attr("class", "label")
            .attr("transform", function(d) {
                const pos = arc.centroid(d);
                const midAngle = (d.startAngle + d.endAngle) / 2;
                pos[0] = radius * (midAngle < Math.PI ? 1.2 : -1.2);
                return `translate(${pos})`;
            })
            .attr("dy", "0.35em")
            .style("text-anchor", function(d) {
                return (d.startAngle + d.endAngle) / 2 < Math.PI ? "start" : "end";
            })
            .text(d => d.data.label)
            .style("font-size", "12px");

        labels.attr("transform", function(d) {
            const pos = arc.centroid(d);
            const midAngle = (d.startAngle + d.endAngle) / 2;
            pos[0] = radius * (midAngle < Math.PI ? 1.2 : -1.2);
            return `translate(${pos})`;
        })
            .style("text-anchor", function(d) {
                return (d.startAngle + d.endAngle) / 2 < Math.PI ? "start" : "end";
            })
            .text(d => d.data.label);

        labels.exit().remove();
    }

    // Initialize pie chart
    updatePieChart();
    // Update the map on load
    updateMap();
// Scatter plot for cancer incidence data
const scatterPlotMargin = { top: 20, right: 60, bottom: 100, left: 70 };
const scatterPlotWidth = 800 - scatterPlotMargin.left - scatterPlotMargin.right;
const scatterPlotHeight = 400 - scatterPlotMargin.top - scatterPlotMargin.bottom;

const scatterSvg = d3.select("#scatter-plot")
    .append("svg")
    .attr("width", scatterPlotWidth + scatterPlotMargin.left + scatterPlotMargin.right)
    .attr("height", scatterPlotHeight + scatterPlotMargin.top + scatterPlotMargin.bottom)
    .append("g")
    .attr("transform", `translate(${scatterPlotMargin.left},${scatterPlotMargin.top})`);

function updateScatterPlot() {
    const selectedYear = +d3.select("#year-selector").property("value");
    const checkedStates = legend.selectAll(".state-checkbox")
        .filter(function() { return this.checked; })
        .data()
        .map(d => d.label);

    const filteredData = cancerIncidenceData.filter(d => d.year === selectedYear && checkedStates.includes(d.state));

    // Define scales
    const x = d3.scaleBand().range([0, scatterPlotWidth]).padding(0.2);
    const y = d3.scaleLinear().range([scatterPlotHeight, 0]).domain([0, 9000]); 
    x.domain(filteredData.map(d => d.state));

    scatterSvg.selectAll(".dot").remove();
    scatterSvg.selectAll(".axis").remove();
    scatterSvg.selectAll(".grid").remove();

    scatterSvg.append("g")
        .attr("class", "grid")
        .call(d3.axisLeft(y).ticks(10).tickSize(-scatterPlotWidth).tickFormat(""));

    scatterSvg.selectAll(".dot")
        .data(filteredData)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("cx", d => x(d.state) + x.bandwidth() / 2)
        .attr("cy", d => y(d.count))
        .attr("r", 8)
        .attr("fill", d => colorScale(legendData.find(ld => ld.label === d.state).code)) 
        .on("mouseover", function(event, d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html(`Year: ${d.year}<br>Deaths: ${d.count}<br>Sex: ${d.sex}`)
                .style("left", (event.pageX + 5) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });

    scatterSvg.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", `translate(0,${scatterPlotHeight})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("y", 0)
        .attr("x", 9)
        .attr("dy", ".35em")
        .attr("transform", "rotate(45)")
        .style("text-anchor", "start");

    scatterSvg.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(10))
        .append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("y", -50)
        .attr("x", -scatterPlotHeight / 2)
        .attr("dy", ".71em")
        .style("text-anchor", "middle")
        .text("Cancer Deaths");

    scatterSvg.append("text")
        .attr("transform", `translate(${scatterPlotWidth / 2},${scatterPlotMargin.top - 10})`)
        .attr("class", "title")
        .text("Cancer Deaths in Australia");
}

updateScatterPlot();
});