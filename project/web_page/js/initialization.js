var map;
var safetyCircle;
var sanFrancisco = {lat: 37.773972, lng: -122.431297};

function myMap() {

  var latLng = new google.maps.LatLng(sanFrancisco)
  var mapOptions = {
    center: latLng,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }

  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  var marker = new google.maps.Marker({
    position: latLng,
    map: map

    });

var centerControlDiv = document.createElement('div');
var centerControl = new CenterControl(centerControlDiv, map);
centerControlDiv.index = 1;
map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

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
