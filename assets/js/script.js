$(document).ready(function () {
  $(".currentTime").text(moment().format("llll"));
  // $(document).foundation();
});
$("#submit").click(function(event){
event.preventDefault();
var country = $("#country").val().trim().toUpperCase();
var city = $("#city").val().trim().toUpperCase();
var startDate = $("#sd").val().toString();
var endDate = $("#ed").val().toString();
var APIKey = "166a433c57516f51dfab1f7edaed8413";

// Here we are building the URL we need to query the database
var queryURL =
  "https://api.openweathermap.org/data/2.5/weather?" +
  "q=" +
  city +
  "," +
  country +
  "&appid=" +
  APIKey;

// Here we run our AJAX call to the OpenWeatherMap API
$.ajax({
  url: queryURL,
  method: "GET",
})
  // We store all of the retrieved data inside of an object called "response"
  .then(function (response) {
    var lat = response.coord.lat;
    var lon = response.coord.lon;
    var countrycode = response.sys.country;
    // function calls using the information we got from the weatherapi call
    console.log(response);
    calendricapi(countrycode);
    // weatherforcastapi(lat, lon);
    // coutryflag(countrycode);
  });
});



function calendricapi(countrycode) {
  $.ajax({
    url:
      "https://calendarific.com/api/v2/holidays?&api_key=dfd7976d8e75420dd3c5e1009a633b9446657f23&country=" +
      countrycode +
      "&year=2020&month=1,2",
    method: "GET",
  }).then(function (response) {
    var holidayarray = response.response.holidays;
    for (var i = 0; i < holidayarray.length; i++) {
      var hname = holidayarray[i].name;
      var hdescription = holidayarray[i].description;
      var hlocation = holidayarray[i].locations;
      var hstate = holidayarray[i].states;
      var htype = holidayarray[i].type;
      var hdate =
        holidayarray[i].date.datetime.month +
        "/" +
        holidayarray[i].date.datetime.day +
        "/" +
        holidayarray[i].date.datetime.year;
        
    }
    console.log(response);
  });
}



function weatherforcastapi(lat, lon) {
  $.ajax({
    url: "",
    method: "GET",
  }).then(function () {
    // weather forcast code goes here
  });
}



function coutryflag(countrycode) {
  $.ajax({
    url: "https://restcountries.eu/rest/v2/alpha/" + countrycode,
    method: "GET",
  }).then(function (response) {
    //  country flag code goes here
  });
}
