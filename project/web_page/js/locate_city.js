function searchResult(cityname) {
  var cities = {
    san_franscisco: {
      lat: 37.773972,
      long: -122.431297
    }
  };
  var coords = cities[cityname];
  var map = new GMap2(document.getElementById("map"));
  map.setCenter(new GLatLng(coords.lat, coords.long), 13);
  map.setUIToDefault();
}
