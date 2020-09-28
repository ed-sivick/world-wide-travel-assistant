$(document).ready(function () {
  $(".currentTime").text(moment().format("llll"));
  // $(document).foundation();
});

// Add Date to top banner of app
var currentDate = moment().format("[Today is:] dddd, MMMM Do, YYYY");
var $todayDate = $(".todayDate");
$todayDate.text(currentDate);

// Clear screen data
$("#clear").click(function (event) {
  event.preventDefault();
  location.reload();
});

$("#submit").click(function (event) {
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
  // start Day
  var startDay = new Date(startDate).getDate() + 1;
  // End Day
  var endDay = new Date(endDate).getDate() + 1;
  if (syear === eyear) {
    if (smonth === emonth) {
      var visitMonth = smonth;
    } else {
      var visitMonth = smonth + "," + emonth;
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
      calendricapi(
        countrycode,
        syear,
        eyear,
        smonth,
        emonth,
        visitMonth,
        startDay,
        endDay
      );
      // weatherforcastapi(lat, lon);
      coutryflag(countrycode);
    });
});

// Calendricapi call begin
function calendricapi(
  countrycode,
  syear,
  eyear,
  smonth,
  emonth,
  visitMonth,
  startDay,
  endDay
) {
  if (syear === eyear) {
    $.ajax({
      url:
        "https://calendarific.com/api/v2/holidays?&api_key=dfd7976d8e75420dd3c5e1009a633b9446657f23&country=" +
        countrycode +
        "&year=" +
        syear +
        "&month=" +
        visitMonth,
      method: "GET",
    }).then(function (response) {
      var holidayarray = response.response.holidays;
      for (var i = 0; i < holidayarray.length; i++) {
        var hname = holidayarray[i].name;
        var hdescription = holidayarray[i].description;
        var hlocation = holidayarray[i].locations;
        var hstate = holidayarray[i].states;
        var htype = holidayarray[i].type;
        var hmonth = holidayarray[i].date.datetime.month;
        var hday = holidayarray[i].date.datetime.day;
        var hyear = holidayarray[i].date.datetime.year;
        var hdate = hmonth + "/" + hday + "/" + hyear;
        if (hmonth === smonth) {
          if (hday < startDay) {
            continue;
          }
        }
        if (hmonth === emonth) {
          if (hday > endDay) {
            continue;
          }
        }
        var trEl = $("<tr>");
        var td1 = $("<td>").text(hname);
        var td2 = $("<td>").text(hdate);
        trEl.append(td1, td2);
        $("#holiday").append(trEl);
      }
      console.log(response);
    });
  } else {
    // Code to be addded
    $.ajax({
      url:
        "https://calendarific.com/api/v2/holidays?&api_key=dfd7976d8e75420dd3c5e1009a633b9446657f23&country=" +
        countrycode +
        "&year=" +
        syear +
        "&month=" +
        smonth,
      method: "GET",
    }).then(function (response1) {
      var holidayarray = response1.response.holidays;
      for (var i = 0; i < holidayarray.length; i++) {
        var hname = holidayarray[i].name;
        var hdescription = holidayarray[i].description;
        var hlocation = holidayarray[i].locations;
        var hstate = holidayarray[i].states;
        var htype = holidayarray[i].type;
        var hmonth = holidayarray[i].date.datetime.month;
        var hday = holidayarray[i].date.datetime.day;
        var hyear = holidayarray[i].date.datetime.year;
        var hdate = hmonth + "/" + hday + "/" + hyear;
        if (hday < startDay) {
          continue;
        }
        var trEl = $("<tr>");
        var td1 = $("<td>").text(hname);
        var td2 = $("<td>").text(hdate);
        trEl.append(td1, td2);
        $("#holiday").append(trEl);
      }
      console.log(response1);
      // ajax call for the end year goes here and updates the ui
      $.ajax({
        url:
          "https://calendarific.com/api/v2/holidays?&api_key=dfd7976d8e75420dd3c5e1009a633b9446657f23&country=" +
          countrycode +
          "&year=" +
          eyear +
          "&month=" +
          emonth,
      }).then(function (response2) {
        var holidayarray = response2.response.holidays;
        for (var i = 0; i < holidayarray.length; i++) {
          var hname = holidayarray[i].name;
          var hdescription = holidayarray[i].description;
          var hlocation = holidayarray[i].locations;
          var hstate = holidayarray[i].states;
          var htype = holidayarray[i].type;
          var hmonth = holidayarray[i].date.datetime.month;
          var hday = holidayarray[i].date.datetime.day;
          var hyear = holidayarray[i].date.datetime.year;
          var hdate = hmonth + "/" + hday + "/" + hyear;
          if (hday > endDay) {
            continue;
          }
          var trEl = $("<tr>");
          var td1 = $("<td>").text(hname);
          var td2 = $("<td>").text(hdate);
          trEl.append(td1, td2);
          $("#holiday").append(trEl);
        }
        console.log(response2);
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
  // var countrycode = "FR";
  $.ajax({
    url: "https://restcountries.eu/rest/v2/alpha/" + countrycode,
    method: "GET",
  }).then(function (response) {
    //  country flag code goes here
    var imgOfFlag = $("<img>").attr("src", response.flag);

    $(".flag").append(imgOfFlag);
    $(".language").text("Language: " + response.languages[0].name);
    $(".population").text("Population: " + response.population);
    $(".currencies").text("Currencies: " + response.currencies[0].name);
    $(".callingCode").text("Dialing code: +" + response.callingCodes);
  });
}
