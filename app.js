const apiEducationUrl =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";
const educationData = localStorage.getItem("education-data")
  ? JSON.parse(localStorage.getItem("education-data"))
  : d3.json(apiEducationUrl, (data) => {
      localStorage.setItem("education-data", JSON.stringify(data));
      return data;
    });

const apiCountiesUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";
const countiesData = localStorage.getItem("counties-data")
  ? JSON.parse(localStorage.getItem("counties-data"))
  : d3.json(apiCountiesUrl, (data) => {
      localStorage.setItem("counties-data", JSON.stringify(data));
      return data;
    });

const width = 1000;
const height = 600;

// svg
const svg = d3.select("#chart").append("svg").attr("width", width).attr("height", height).attr("id", "svg");

// states
const statesContainer = d3.select("#svg").append("g").attr("id", "states");
statesContainer
  .selectAll("path")
  .data(topojson.feature(countiesData, countiesData.objects.states).features)
  .enter()
  .append("path")
  .attr("d", d3.geoPath())
  .attr("fill", "none");

// counties
const countiesContainer = d3.select("#svg").append("g").attr("id", "counties");
countiesContainer
  .selectAll("path")
  .data(topojson.feature(countiesData, countiesData.objects.counties).features)
  .enter()
  .append("path")
  .attr("d", d3.geoPath())
  .attr("class", "county");
