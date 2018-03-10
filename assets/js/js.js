//Initial array of topics called artist
var artist = [
    "Lady Gaga",
    "Kendrick Lamar",
    "Little Big Town",
    "Sam Smith",
    "Sting",
    "Rihanna",
    "Kesha",
    "Childish Gambino",
    "Elton John",
    "Miley Cyrus",
    "Bruno Mars",
    "Cardi B",
    "Sza",
    "U2"
];


//displays GIFs on the html. limited 10 
function displayArtist() {

    var artist = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + artist + "&api_key=CAcKaM8nqKaNqi0peNxTAflAfnw7ahgl&limit=10";
    
    //Ajax Call
    $.ajax({
            url: queryURL,
            method: "get"
        })
        .then(function(response) {


            var results = response.data; //accesses info inside data key

            for (var i = 0; i < results.length; i++) {
                var artistDiv = $("<div class = 'artistDiv'>") //create a new div

                var p = $("<p>").text("Rating: " + rating) //adds rating on page
                var rating = results[i].rating;

                var artistImg = $("<img>");
                artistImg.attr("src", results[i].images.fixed_height.url);
                artistDiv.append(p);
                artistDiv.append(artistImg);
                artistImg.addClass("play");

                $("#gif-view").prepend(artistDiv);

                $(".play").on("click", function(event) {
                    var dataAnimate = $(this).attr("data-animate");
                    var dataStill = $(this).attr("data-still");
                    var currentURL = $(this).attr("src");

                    if (currentURL === dataStill) {
                        $(this).attr("src", dataAnimate);
                    } else {
                        $(this).attr("src", dataStill)

                        //Tried to rework example from class
                        //$(".play").on("click", function() {

                        // var state = $(this).attr("data-state");

                        //if (state === "still") {
                        //  $(this).attr("src", $(this).attr("data-animate"));
                        //   $(this).attr("data-state", "animate");
                        // } else {
                        //   $(this).attr("src", $(this).attr("data-still"));
                        //   $(this).attr("data-state", "still");
                    }
                })
            }

        });
}
//makes new button upon user input 
function makeButtons() {

    $("#buttonLocation").empty();

    for (var i = 0; i < artist.length; i++) {
        var a = $("<button>");
        a.addClass("artist-btn");
        a.attr("data-name", artist[i]);
        a.text(artist[i]);
        $("#buttonLocation").append(a);

    }
}

$("#addButton").on("click", function(event) {
    event.preventDefault();
    var artists = $("#addArtist").val().trim();
    artist.push(artists);
    makeButtons();
})

$(document).on("click", ".artist-btn", displayArtist)

makeButtons();