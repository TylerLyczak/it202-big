console.log("Running2");

// Hids all the divs with the class "content" from showing
function hideScreens() {
  $(".content").hide();
}

// Hids the main page
function hideFirstScreen()  {
  $(".firstPage").hide();
}

// Shows the main page
function showFirstScreen () {
  $(".firstPage").show();
}

// Hides any videos from being shown
function hideVideos ()  {
  $("#dogVideo").hide();
}

$('.ui.dropdown')
  .dropdown()
;

// Used to return the correct word for the crime api
function returnCorrectField (word)  {
  var field = "";
  if (word == 0) {
    field = "primary_type";
  }
  else if (word == 1) {
    field = "ward";
  }
  else if (word == 2)  {
    field = "date";
  }
  return field;
}

// Rounds a number to the nearest 10th in either direction
function roundToNearestTen (int, dir)  {
  var i = 0;
  while (int%10 != 0) {
    if (dir === "up") {
      int++;
    } else {
      int--;
    }
    i++;
  }
  return int;
}

// Rounds a number to the nearest 10th in either direction
function roundToNearestFive (int, dir)  {
  var i = 0;
  while (int%5 != 0) {
    if (dir === "up") {
      int++;
    } else {
      int--;
    }
    i++;
  }
  return int;
}

// Shows any navbar page
$(".nav-link").on("click", function(){
  hideScreens();
  hideFirstScreen();
  var target = $(this).attr("href");
  $(target).show();
});

// Shows the main page when the user clicks on the main button
$(".navbar-brand").on("click", function(){
  hideScreens();
  showFirstScreen();
});

// Button listener to request from the api to get a new image/video
$("#requestDog").on("click", function(){
  requestForDogPicture();
});

// Button listener that submits the user inputed word to the api function
$("#requestDictionary").on("click", function(){
  var word = $("#dictionaryWord").val();
  if (word !== "")  {
    requestForWordDictionary(word);
  }
});

// Button listener that submutes the user inputed type of graph and the amount.
$("#requestGraph").on("click", function(){
  var word = $("#crimeWord").val();
  var int = $("#crimeNumber").val();
  var field = returnCorrectField(word);
  if (field !== "") {
    requestForCrime (field, int);
  }
});

$("#requestMap").on("click", function(){
  initMap();
});


// Makes a call to the api to get a dog picture/video
function requestForDogPicture ()  {
  $.get("https://random.dog/woof.json",

    function(response) {
      console.log(response);
      var url = response.url;
      var urlSplit = url.split(".");
      var typeOfData = urlSplit[urlSplit.length-1];
      if (typeOfData === "mp4") {
        $("#dogVideo").empty();
        $("#dogVideo").html('<source src='+url+'></source>');
        $("#dogImage").hide();
        document.getElementById("dogVideo").load();
        $("#dogVideo").show();
      } else {
        $("#dogImage").attr("src",url);
        $("#dogVideo").hide();
        $("#dogImage").show();
      }
    });
}

// Makes a call to Merriam-Webster api with an user inputed word.
function requestForWordDictionary(word) {
  var url = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" + word + "?key=18e62b19-340b-4024-978f-67826d0b6401";
  $.get(url,

    function(response) {
      console.log(response);
      var defs = response[0].shortdef;
      $("#dictionaryResponse").empty();
      for (var i=0; i<defs.length; i++) {
        var int = i+1;
        var paraVar = "<p id=" + i + ">" + int + ". " + defs[i] + "</p>";
        $("#dictionaryResponse").append(paraVar);
      }
    });
}


$(document).ready(function() {
  hideVideos();
  hideScreens();
  // register the service worker for offline use
   if('serviceWorker' in navigator) {
     navigator.serviceWorker
              .register('/it202-big/sw.js', {scope: '/it202-big/'})
              .then(function() { console.log("Service Worker Registered"); });
   }
});
