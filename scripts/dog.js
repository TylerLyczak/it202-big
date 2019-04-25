// Hides any videos from being shown
function hideVideos ()  {
  $("#dogVideo").hide();
}

// Button listener to request from the api to get a new image/video
$("#requestDog").on("click", function(){
  requestForDogPicture();
});

// Makes a call to the api to get a dog picture/video
function requestForDogPicture ()  {
  $.get("https://random.dog/woof.json",

    function(response) {
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
});
