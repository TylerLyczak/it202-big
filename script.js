console.log("Running");

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


$(document).ready(function() {
  hideVideos();
  hideScreens();
});
