mapboxgl.accessToken = 'pk.eyJ1IjoibWlzaGF2YWlkIiwiYSI6ImNsM3U4bHR3bjI4ZWUzaW9leGlrbXN2ZmcifQ.JA7tcQL3G1x8i7fZuWw2nA';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mishavaid/cl3zcjv9h001d14qla3z81rc8',
    zoom: 9.4,
    center: [-96.9, 32.75],
});

map.on("load", function () {
    map.addLayer({
      id: "texas_counties_outline",
      type: "line",
      source: {
        type: "geojson",
        data: "data/countiesFinal.geojson",
      },
      paint: {
        "line-color": "#e5e5e5",
        "line-width": 0.7,
    },
},
"waterway-label" // Here's where we tell Mapbox where to slot this new layer
); 

map.addLayer({
  id: "census_tracts",
  type: "line",
  source: {
    type: "geojson",
    data: "data/HispData.geojson",
  },
  paint: {
    "line-color": "#000000",
    "line-width": 0.4,
  },
},
"texas_counties_outline" // Here's where we tell Mapbox where to slot this new layer
); 


    
    map.addLayer({
      id: "us_states_elections",
      type: "fill",
      source: {
        type: "geojson",
        data: "data/HispData.geojson",
      },
      'paint': {
        "fill-color": [
          "match", ['get', 'naturalBreaks'],
            "0% - 17%", "#f1eef6",
            "17% - 30%", "#bdc9e1",
            "30% - 47%", "#74a9cf",
            "47% - 69%", "#2b8cbe",
            "69% - 98%", "#045a8d",
            "#ffffff",
          ],
          "fill-outline-color": "#ffffff",
    
       
    }
}, 'census_tracts');
});

map.on("click", "us_states_elections", function (e) {
  var tractName = e.features[0].properties.GeoDisp;
  var hispPerc = e.features[0].properties.hispPerc;
  var totalPop = e.features[0].properties.TotalPop;
  hispPerc = (hispPerc * 100).toFixed(0);
  totalPop = totalPop.toLocaleString();
  tractName = tractName.toUpperCase();
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(
      "<h4>" +
        tractName +
        "</h4>" +
        "<h2>" +
        "<p>" +
        hispPerc +
        "% - (" +
        totalPop +
        " total population)</p>"
    )
    .addTo(map);
});