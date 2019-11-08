
$(document).ready(function() {
  var topics = [];
  
     function displayCharacter() {
  
    var x = $(this).data("search");
    console.log(x);
  
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=2aJbiPDzELXIwe2huhcQfpK3XBM2LPq0";
  
    console.log(queryURL);
  
    $.ajax({
            url: queryURL,
            method: "GET"
          }).done(function(response) {
            var results = response.data;
            console.log(results);
            for (var i = 0; i < results.length; i++) {
            

            var gifDiv = $("<div class='item'>");
  
            var rating = results[i].rating;
            var defaultAnimatedSrc = results[i].images.fixed_height.url;
            var staticSrc = results[i].images.fixed_height_still.url;
            var characterImage = $("<img>");
            var p = $("<p>").text("Rating: " + rating);
  
            characterImage.attr("src", staticSrc);
            characterImage.addClass("characterGiphy");
            characterImage.attr("data-state", "still");
            characterImage.attr("data-still", staticSrc);
            characterImage.attr("data-animate", defaultAnimatedSrc);
            gifDiv.append(p);
            gifDiv.append(characterImage);
            $("#gifArea").prepend(gifDiv);
  
          }
    });
  }
  
    $("#addCharacter").on("click", function(event) {
          event.preventDefault();
          var newcharacter = $("#characterInput").val().trim();
          topics.push(newcharacter);
          console.log(topics);
          $("#characterInput").val('');
          displayButtons();
        });
  
    function displayButtons() {
      $("#buttons").empty();
      for (var i = 0; i < topics.length; i++) {
        var a = $('<button class="btn btn-dark">');
        a.attr("id", "character");
        a.attr("data-search", topics[i]);
        a.text(topics[i]);
        $("#buttons").append(a);
      }
    }
  
  
    displayButtons();
  
    $(document).on("click", "#character", displayCharacter);
  
    $(document).on("click", ".characterGiphy", pausePlayGifs);
  
    function pausePlayGifs() {
       var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
    }
  }
  
  });