radiusBar.addEventListener('change', function(){

  var value = radiusBar.value;
  document.getElementById("radiusValue").innerHTML = value;
  console.log(safetyCircle);
  updateRadius(safetyCircle, value);
  console.log(safetyCircle);
});

function updateRadius(circle, radius){
  circle.set('radius', parseInt(radius * 1000, 10));
}
