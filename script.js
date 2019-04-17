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

$("#requestGraph").on("click", function(){
  var word = $("#crimeWord").val();
  var int = $("#crimeNumber").val();
  var field = returnCorrectField(word);
  if (field !== "") {
    requestForCrime (field, int);
  }
})

function requestForCrime (field, int) {

  $.get("https://data.cityofchicago.org/resource/6zsd-86xi.json?$limit=" + int,
    function(response) {
      console.log(response);
      var dataPoints = [];

      for (var i=0; i<response.length; i++) {
        //console.log(response[i].case_number);
        var found = false;
        var labelType = response[i].primary_type;
        for (var j=0; j<dataPoints.length; j++) {
          if (dataPoints[j].label === labelType)  {
            dataPoints[j].y++;
            found = true;
            break;
          }
        }

        if (!found) {
          dataPoints.push ({ y:1, label: labelType});
          console.log("New label: " + labelType);
        }
      }
      console.log(dataPoints.length);

      var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,

        title:{
          text: "Crime in Chicago"
        },
        axisX:{
          interval: 1
        },
        axisY2:{
          interlacedColor: "rgba(1,77,101,.2)",
      		gridColor: "rgba(1,77,101,.1)",
      		title: "Number of Crimes"
        },
        data: [{
          type: "bar",
          name: "Types of Crime",
          axisYType: "secondary",
          color: "#014D65",
          dataPoints: dataPoints
        }]
      });
      chart.render();
    });
}

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
});
