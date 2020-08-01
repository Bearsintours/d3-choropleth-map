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
const statesJson = topojson.feature(countiesData, countiesData.objects.states);
const statesContainer = d3.select("#svg").append("g").attr("id", "states");
statesContainer
  .selectAll("path")
  .data(statesJson.features)
  .enter()
  .append("path")
  .attr("d", d3.geoPath())
  .attr("fill", "none");

// counties
const countiesJson = topojson.feature(countiesData, countiesData.objects.counties);
const finalData = countiesJson.features.map((county) => addEducationData(county));
const countiesContainer = d3.select("#svg").append("g").attr("id", "counties");
countiesContainer
  .selectAll("path")
  .data(finalData)
  .enter()
  .append("path")
  .attr("d", d3.geoPath())
  .attr("class", "county")
  .attr("fill", (d) => fillColor(d["properties"]["bachelorsOrHigher"]))
  .attr("data-fips", (d) => d["id"])
  .attr("data-education", (d) => d["properties"]["bachelorsOrHigher"]);

function addEducationData(county) {
  county.properties = educationData.filter((countyData) => countyData["fips"] == county.id)[0];
  return county;
}

function fillColor(score) {
  if (Number(score) < 20) {
    return "#e5f5e0";
  }
  if (Number(score) < 40) {
    return "#a1d99b";
  }
  if (Number(score) < 60) {
    return "#41ab5d";
  }
  if (Number(score) > 60) {
    return "#00441b";
  }
}
