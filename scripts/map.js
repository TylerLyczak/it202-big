// Decalares the vars for the map and the info window
var map, infoWindow;

// Button listener that will make the google maps render to the page
$("#requestMap").on("click", function(){
  console.log("Init map");
  initMap();
});


// Thos funciton will initialize the map in the div of the html file
// Its intial spot is Chicago
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 41.8781, lng: -87.6298},
    zoom: 6
  });
  // Makes a new infor window
  infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  // Asks the user to allow access to there location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(pos);
      map.setZoom(16);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

// If the user doesn't allow there location, it will give an error
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}
