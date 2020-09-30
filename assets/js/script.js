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
            $(".weatherText").append(" - " + response.name);
            $(".countryFacts").text("Facts About - " + country);
            $(".holidayText").text("Holidays in " + country + " between "+ smonth+"/"+startDay+"/"+syear + " - " + emonth+"/"+endDay+"/"+eyear);
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
            weatherforcastapi(lat, lon);
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

function weatherforcastapi(lat, lon) {
    var APIKey = "166a433c57516f51dfab1f7edaed8413";
    $.ajax({
      url:
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=" +
        APIKey,
      method: "GET",
    }).then(function (response3) {
      console.log(response3);
      var divEl = $("<div class = 'centerText card-divider'>");
      var h5El = $("<h5>").text("Today:" + moment().format("l"));
      var imgEl = $("<img alt='weather icon'>");
      imgEl.attr("src", "https://openweathermap.org/img/w/" +
      response3.current.weather[0].icon +
      ".png");
      var divEl2 = $("<div class 'card-section'>");
      var h6El = $("<h6 class ='temperature'>").text(
        "Temp: " +
          ((response3.current.temp - 273.15) * 1.8 + 32).toFixed(2) +
          "°F"
      );
      var h6El2 = $("<h6 class='humidity'>").text(
        "Humidity: " + response3.current.humidity + "%"
      );
      divEl2.append(h6El, h6El2);
      divEl.append(h5El, imgEl, divEl2);
      var cardEl = $(".day1").addClass("card")
     cardEl.append(divEl);
      for (var i = 1; i < 8; i++) {
        var j = i + 1;
        var divEl = $("<div class = 'centerText card-divider'>");
        var h5El = $("<h5>").text(moment().add(i, "days").calendar("l"));
        var imgEl = $("<img alt='weather icon'>")
        imgEl.attr("src", "https://openweathermap.org/img/w/" +
        response3.daily[i].weather[0].icon +
        ".png");
        var divEl2 = $("<div class ='card-section'>");
        var h6El = $("<h6 class ='temperature'>").text(
          "Temp: " +
            ((response3.daily[i].temp.day - 273.15) * 1.8 + 32).toFixed(2) +
            "°F"
        );
        var h6El2 = $("<h6 class='humidity'>").text(
          "Humidity: " + response3.daily[i].humidity + "%"
        );
        divEl2.append(h6El, h6El2);
        divEl.append(h5El, imgEl, divEl2);      
       var cardEl =  $(".day"+j).addClass("card");
       cardEl.append(divEl);
      }
    });
  }

//City information
function coutryflag(countrycode) {
    //https://restcountries.eu requires no api key
    $.ajax({
        url:
            "https://restcountries.eu/rest/v2/alpha/" +
            //country code pulls code from open weather api
            countrycode,
        method: "GET",
    }).then(function (response) {
        //Pulling image data and creating element dynamically
        var imgOfFlag = $("<img>").attr("src", response.flag);
        //Displaying it to the html selected by class
        $(".flag").append(imgOfFlag);
        //Displaying language data
        $(".language").text("Language: " + response.languages[0].name);
        //Displaying population & giving comma to it
        $(".population").text(
            "Population: " +
            Number(parseFloat(response.population).toFixed()).toLocaleString()
        );
        //Displaying currencies data (some countries use several currencies)
        $(".currencies").text(
            "Currencies: " +
            response.currencies
                .filter(function (c) {
                    return c.name;
                })
                .map(function (c) {
                    return c.name + "(" + c.code + ")";
                })
                .join(", ")
        );
        //Displaying dialing code
        $(".callingCode").text("Dialing code: +" + response.callingCodes);
    });
}