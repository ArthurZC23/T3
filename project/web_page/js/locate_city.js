
function myMap() {
  var mapOptions = {
    center: new google.maps.LatLng(37.773972,-122.431297),
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP
}
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);
}
