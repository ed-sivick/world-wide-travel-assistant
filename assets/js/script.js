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
// start year
var syear = new Date(startDate).getFullYear();
// start month
var smonth = new Date(startDate).getMonth() + 1;
// end year
var eyear = new Date(endDate).getFullYear();
// end month
var emonth = new Date(endDate).getMonth() + 1;
if(syear===eyear){
if(smonth === emonth){
  var visitMonth = smonth;
}else{
  var visitMonth = smonth +","+emonth;
}
}
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
     calendricapi(countrycode, syear, eyear, smonth, emonth, visitMonth);
    // weatherforcastapi(lat, lon);
    // coutryflag(countrycode);
  });
});

// Calendricapi call begin
function calendricapi(countrycode, syear, eyear, smonth, emonth, visitMonth) {
  if(syear === eyear){
  $.ajax({
    url:
      "https://calendarific.com/api/v2/holidays?&api_key=dfd7976d8e75420dd3c5e1009a633b9446657f23&country=" +
      countrycode +
      "&year="+ syear +"&month="+ visitMonth,
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
}else{
// Code to be addded
$.ajax({
  url:
    "https://calendarific.com/api/v2/holidays?&api_key=dfd7976d8e75420dd3c5e1009a633b9446657f23&country=" +
    countrycode +
    "&year="+ syear +"&month="+ smonth,
  method: "GET",
}).then(function (response1) {
  var holidayarray = response1.response.holidays;
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
  console.log(response1);
  // ajax call for the end year goes here and updates the ui
  $.ajax({
    url:  "https://calendarific.com/api/v2/holidays?&api_key=dfd7976d8e75420dd3c5e1009a633b9446657f23&country=" +
    countrycode +
    "&year="+ eyear +"&month="+ emonth,
  }).then(function(response2){
    var holidayarray = response1.response.holidays;
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
    console.log(response2)
  });

});

}
}
// End Calendricapi call

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
    var imgOfFlag = $("<img>").attr("src", response.flag);
    $(".flag").append(imgOfFlag);
    $(".language").text(`Language: ${response.languages[0].name}`);
    $(".population").text(`Population: ${response.population}`);
    $(".currencies").text(`Currencies: ${response.currencies[0].name}`);
    $(".callingCode").text(`Dialing code: +${response.callingCodes}`);
  });
}
