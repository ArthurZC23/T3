var safetyCircle;

function myMap() {

  var latLng = new google.maps.LatLng(37.773972,-122.431297)
  var mapOptions = {
    center: latLng,
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }

  var map = new google.maps.Map(document.getElementById("map"), mapOptions);
  var marker = new google.maps.Marker({
    position: latLng,
    map: map

    });
  safetyCircle = new google.maps.Circle({
   strokeColor: '#FF0000',
   strokeOpacity: 0.8,
   strokeWeight: 2,
   fillColor: '#FF0000',
   fillOpacity: 0.35,
   map: map,
   center: latLng,
   radius: 1 * 1000
  });
}
