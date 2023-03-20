const map = new ol.Map({
  layers: [],
  target: "map",
  view: new ol.View({
    center: [-74, 40],
    zoom: 3,
  }),
});
const osm = new ol.layer.Tile({
  source: new ol.source.OSM(),
  visible: true,
  layerName: "OSM",
});
const stadiamap = new ol.layer.Tile({
  source: new ol.source.XYZ({
    url: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png",
  }),
  layerName: "Stad",
  visible: false,
});

// console.log(OSM);
const group = new ol.layer.Group({
  layers: [osm, stadiamap],
});

const swither = document.querySelectorAll("input");
swither.forEach((swith) => {
  swith.addEventListener("click", (e) => {
    const name = e.target.id;
    group.getLayers().forEach((LL) => {
      if (name === LL.get("layerName")) {
        LL.setVisible(true);
      } else {
        LL.setVisible(false);
      }
    });
  });
});

// const NYCneig = new ol.layer.Tile({
//   source: new ol.source.TileWMS({
//     url: "http://localhost:5005/geoserver/Egypt/nyc_neighborhoods/ows",
//     params: { LAYERS: "	Egypt:nyc_neighborhoods", TILED: true },
//     serverType: "geoserver",
//     // Countries have transparency, so do not fade tiles:
//     transition: 0,
//   }),
//   style: new ol.style.Style({
//     fill: new ol.style.Fill({ color: "#84ace0" }),
//     stroke: new ol.style.Stroke({ color: "#84ace0", width: 3 }),
//   }),
// });

// const vectorLayer = new ol.layer.Vector({
//   // background: "#1a2b39",
//   source: new ol.source.Vector({
//     url: "/map.geojson",
//     format: new ol.format.GeoJSON(),
//   }),
//   style: new ol.style.Style({
//     fill: new ol.style.Fill({ color: "#84ace0" }),
//     stroke: new ol.style.Stroke({ color: "#34eb7a", width: 3 }),
//   }),
// });
const vectorLayer = new ol.layer.Vector({
  // background: "#1a2b39",
  source: new ol.source.Vector({
    url: "https://geowebservices.stanford.edu/geoserver/wfs?request=getFeature&outputformat=application/json&typeName=druid:vn895fq9113",
    format: new ol.format.GeoJSON(),
  }),
  style: new ol.style.Style({
    fill: new ol.style.Fill({ color: "#84ace0" }),
    stroke: new ol.style.Stroke({ color: "#34eb7a", width: 1 }),
  }),
});
// const NYCstre = new ol.layer.Tile({
source: new ol.source.TileWMS({
  url: "http://localhost:5005/geoserver/Egypt/nyc_streets/ows",
  params: { LAYERS: "nyc_streets", TILED: true },
  serverType: "geoserver",
  // Countries have transparency, so do not fade tiles:
  transition: 0,
}),
  // // });
  // const NYCstat = new ol.layer.Tile({
  //   source: new ol.source.TileWMS({
  //     url: "http://localhost:5005/geoserver/Egypt/nyc_subway_stations/ows",
  //     params: { LAYERS: "nyc_subway_stations", TILED: true },
  //     serverType: "geoserver",
  //     // Countries have transparency, so do not fade tiles:
  //     transition: 0,
  //   }),
  // });
  map.addLayer(osm);
map.addLayer(stadiamap);
// map.addLayer(NYCneig);
map.addLayer(vectorLayer);
