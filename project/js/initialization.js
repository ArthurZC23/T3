var map;
var safetyCircle;
var sanFrancisco = {lat: 37.773972, lng: -122.431297};
var crimeData = new Array()
var crimeLocations = new Array();
var dangerAudio = new Audio("https://raw.githubusercontent.com/ArthurZC23/T3/master/project/data/Audio/danger.mp3");
var carefulAudio = new Audio("https://raw.githubusercontent.com/ArthurZC23/T3/master/project/data/Audio/careful.mp3");
var safeAudio = new Audio("https://raw.githubusercontent.com/ArthurZC23/T3/master/project/data/Audio/safe.mp3");

function myMap() {

  var latLng = new google.maps.LatLng(sanFrancisco);
  var mapOptions = {
    center: latLng,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

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
  strokeColor: '#000000',
  strokeOpacity: 0.5,
  strokeWeight: 0.5,
  fillColor: '#FFFFFF',
  fillOpacity: 0.35,
  map: map,
  center: latLng,
  radius: 1000 //Radius is in m
  });

  google.maps.event.addListener(map, 'click', function(event) {
      safetyCircle.set('center', event.latLng);
      marker.set('position', event.latLng);
      dangerLevel = dangerEstimation(event.latLng);
      style_circle(dangerLevel);

  });

}

function dangerEstimation(myLocation){

  var dangerLevel = 0
  threshold = safetyCircle.get('radius')/1000
  for(var i = 0; i<crimeLocations.length; i++){
    dist = computeDistanceBetween(myLocation, crimeLocations[i])
    if(dist < threshold){
      dangerLevel += 1
    }
  }
  return dangerLevel
}

function style_circle(dangerLevel){

  if (dangerLevel <= 1000){
    safetyCircle.set('fillColor', '#00FF00')
    safeAudio.play()
  }
  else if (dangerLevel >= 5000){
    safetyCircle.set('fillColor', '#FF0000')
    dangerAudio.play()
  }
  else{
    safetyCircle.set('fillColor', '#FFFF00')
    carefulAudio.play()
  }
}

//Compute distance between two points on the map
//Computation is based on the haversine formula
function computeDistanceBetween(myLocation, crimeLocation){

  var R = 6371; // km
  var myLat = myLocation.lat()*(Math.PI/180);
  var crimeLat = crimeLocation[0]*(Math.PI/180);
  var latDist = (crimeLat-myLat);
  var longDist = (crimeLocation[1]-myLocation.lng())*(Math.PI/180);

  var a = Math.sin(latDist/2) * Math.sin(latDist/2) +
          Math.cos(myLat) * Math.cos(crimeLat) *
          Math.sin(longDist/2) * Math.sin(longDist/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  return d;
}

//Get SF crime data
$.getJSON("https://raw.githubusercontent.com/ArthurZC23/T3/master/project/data/PDI/sfCrimeTourist2016.json", function(data){
  //data is the JSON string
  //alert('success');
  crimeData = data;
  var loc;
  for (var i = 0; i < crimeData.length; i++){
    loc = data[i].Location;
    loc = loc.substring(1, loc.length-1);
    loc = JSON.parse("[" + loc + "]")
    crimeLocations[i] = [loc[0], loc[1]];
    }
});
