// The value for 'accessToken' begins with 'pk...'
mapboxgl.accessToken =
  "pk.eyJ1IjoibGl1aGFvcmFuMzAyNTgyOCIsImEiOiJjbTV3aWpvejIwMm90MmxzYnQ2amI3bHR2In0.SYbLY9WroX-2iCQJvaZMWw";

// Define a map object by initialising a Map from Mapbox
const map = new mapboxgl.Map({
  container: "map",
  // Replace YOUR_STYLE_URL with your style URL.
  style: "mapbox://styles/liuhaoran3025828/cm66osjfl002601s3a1w4dh17"
});

map.on("mousemove", (event) => {
  const dzone = map.queryRenderedFeatures(event.point, {
    layers: ["glasgow-simd"]
  });
  document.getElementById("pd").innerHTML = dzone.length
    ? `<h3>${dzone[0].properties.DZName}</h3><p>Rank: <strong>${dzone[0].properties.Percentv2}</strong> %</p>`
    : `<p>Hover over a data zone!</p>`;
  map.getSource("hover").setData({
    type: "FeatureCollection",

    features: dzone.map(function (f) {
      return { type: "Feature", geometry: f.geometry };
    })
  });
});

map.on("load", () => {
  const layers = [
    "<1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10"
  ];
  const colors =['#a50026','#d73027','#f46d43','#fdae61','#fee090','#e0f3f8','#abd9e9','#74add1','#4575b4','#313695'];

  // create legend
  const legend = document.getElementById("legend");

  layers.forEach((layer, i) => {
    const color = colors[i];
    const key = document.createElement("div");
    //place holder
    if (i <= 1 || i >= 8) {
      key.style.color = "white";
    }
    key.className = "legend-key";
    key.style.backgroundColor = color;
    key.innerHTML = `${layer}`;
    legend.appendChild(key);
  });

  map.addSource("hover", {
    type: "geojson",

    data: { type: "FeatureCollection", features: [] }
  });

  map.addLayer({
    id: "dz-hover",

    type: "line",

    source: "hover",

    layout: {},

    paint: {
      "line-color": "black",

      "line-width": 4
    }
  });
});

map.addControl(new mapboxgl.NavigationControl(), "top-left");

map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },

    trackUserLocation: true,

    showUserHeading: true
  }),

  "top-left"
);

const geocoder = new MapboxGeocoder({
  // Initialize the geocoder

  accessToken: mapboxgl.accessToken, // Set the access token

  mapboxgl: mapboxgl, // Set the mapbox-gl instance

  marker: false, // Do not use the default marker style

  placeholder: "Search in Glasgow", // Placeholder text for the search bar

  proximity: {
    longitude: 55.8642,

    latitude: 4.2518
  } // Coordinates of Glasgow center
});

map.addControl(geocoder, "top-left");