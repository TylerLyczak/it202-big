// Button listener that submits the user inputed word to the api function
$("#requestDictionary").on("click", function(){
  console.log("Clicked");
  var word = $("#dictionaryWord").val();
  if (word !== "")  {
    requestForWordDictionary(word);
  }
});


// Makes a call to Merriam-Webster api with an user inputed word.
function requestForWordDictionary(word) {
  var url = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" + word + "?key=18e62b19-340b-4024-978f-67826d0b6401";
  $.get(url,

    function(response) {
      var defs = response[0].shortdef;
      $("#dictionaryResponse").empty();
      for (var i=0; i<defs.length; i++) {
        var int = i+1;
        var paraVar = "<p id=" + i + ">" + int + ". " + defs[i] + "</p>";
        $("#dictionaryResponse").append(paraVar);
      }
    });
}
