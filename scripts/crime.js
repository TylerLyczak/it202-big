var db = new Dexie("request_database");
db.version(1).stores({
    request: 'id++, data_id, date, primary_type, ward'
});

// Declares ar variable to track the size of the database when the user reopens the website
var oldCalledSize = 0;
db.request.count().then( function(c){oldCalledSize = c;});

// Button listener that submites the user inputed type of graph and the amount.
$("#requestGraph").on("click", function(){
  var word = $("#crimeWord").val();
  var int = $("#crimeNumber").val();
  var field = returnCorrectField(word);
  if (field !== "") {
    requestForCrime (field, int);
  }
});

$('.ui.dropdown')
  .dropdown()
;

// Makes a call to an API that returns crime data
// The field and int specifiy what to call from the API
function requestForCrime (field, int) {
  var titleText;
  var axisY2Title;
  var dataName;
  if (field === "primary_type") {
    titleText = "Crime in Chicago for each Offense";
    axisY2Title = "Number of Crimes";
    dataName = "Types of Crime";
  }
  else if (field === "ward")  {
    titleText = "Crime in Chicago for Wards";
    axisY2Title = "Number of Crimes";
    dataName = "Types of Crime";
  }
  else if (field === "date")  {
    titleText = "Crime in Chicago on Each Day";
    axisY2Title = "Number of Crimes";
    dataName = "Types of Crime";
  }
  if (parseInt(int, 10) != parseInt(oldCalledSize, 10)) {
    $.get("https://data.cityofchicago.org/resource/6zsd-86xi.json?$limit=" + int,
      function(response) {
        makeChartFromResponse(response, field, int, titleText, axisY2Title, dataName);
      });
  }
  else {
    makeChartFromIndex(field, int, titleText, axisY2Title, dataName);
  }
}

// Makes a chart from the response from the API
function makeChartFromResponse(response, field, int, titleText, axisY2Title, dataName)  {
  var dataPoints = [];
  db.request.clear();

  for (var i=0; i<response.length; i++) {
    db.request.put({data_id: response[i].id, date: response[i].date, primary_type: response[i].primary_type, ward: response[i].ward});
    var labelType;
    if (field === "primary_type") {
      labelType = response[i].primary_type;
    }
    else if (field === "ward")  {
      labelType = response[i].ward;
      var lowNum = roundToNearestFive(labelType, "down");
      var highNum = roundToNearestFive(labelType, "up");
      if (lowNum === highNum) {
        lowNum -= 5;
      }
      lowNum += 1;
      labelType = lowNum + " - " + highNum;
    }
    else if (field === "date")  {
      labelType = response[i].date;
      var newType = labelType.split("T");
      labelType = newType[0];
    }

    var found = false;
    for (var j=0; j<dataPoints.length; j++) {
      if (dataPoints[j].label === labelType)  {
        dataPoints[j].y++;
        found = true;
        break;
      }
    }

    if (!found) {
      dataPoints.push ({ y:1, label: labelType});
    }
  }
  // Makes a chart with all the data received
  var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    title:{
      text: titleText
    },
    axisX:{
      interval: 1
    },
    axisY2:{
      interlacedColor: "rgba(1,77,101,.2)",
      gridColor: "rgba(1,77,101,.1)",
      title: axisY2Title
    },
    data: [{
      type: "bar",
      name: dataName,
      axisYType: "secondary",
      color: "#014D65",
      dataPoints: dataPoints
    }]
  });
  chart.render();
  // Reloads the div containing the chart
  $("#chartContainerDiv").height($(".canvasjs-chart-canvas").height());
  oldCalledSize = int;
}

// Makes a chart from the data in the IndexDB
function makeChartFromIndex(field, int, titleText, axisY2Title, dataName)  {
  var dataPoints = [];
  db.request.each (data => {
    var labelType;
    if (field === "primary_type") {
      labelType = data.primary_type;
    }
    else if (field === "ward")  {
      labelType = data.ward;
      var lowNum = roundToNearestFive(labelType, "down");
      var highNum = roundToNearestFive(labelType, "up");
      if (lowNum === highNum) {
        lowNum -= 5;
      }
      lowNum += 1;
      labelType = lowNum + " - " + highNum;
    }
    else if (field === "date")  {
      labelType = data.date;
      var newType = labelType.split("T");
      labelType = newType[0];
    }

    var found = false;
    for (var j=0; j<dataPoints.length; j++) {
      if (dataPoints[j].label === labelType)  {
        dataPoints[j].y++;
        found = true;
        break;
      }
    }

    if (!found) {
      dataPoints.push ({ y:1, label: labelType});
    }
  }).then(() => {
    // Makes a chart with all the data received
    var chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      title:{
        text: titleText
      },
      axisX:{
        interval: 1
      },
      axisY2:{
        interlacedColor: "rgba(1,77,101,.2)",
        gridColor: "rgba(1,77,101,.1)",
        title: axisY2Title
      },
      data: [{
        type: "bar",
        name: dataName,
        axisYType: "secondary",
        color: "#014D65",
        dataPoints: dataPoints
      }]
    });
    chart.render();
    // Reloads the div containing the chart
    $("#chartContainerDiv").height($(".canvasjs-chart-canvas").height());
  });

}
