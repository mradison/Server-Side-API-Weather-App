const apiKey = "cd21aa2fdd5a548e8d8915692b4f694a";


$( document ).ready(function() {
    console.log( "ready!" );

    var currentDateContainer = document.getElementById("currentDay");

    var currentDate = new Date();   

    currentDateContainer.innerHTML = currentDate;
    var currentHour = currentDate.getHours()
    console.log(currentHour);

    var container = $('#cityWeather');
    var forcastContainer = $('#fiveDay');
    var savedData = $('#savedData');

    var searchButton = document.getElementById('search');

    var input = document.getElementById("city");

    $('#search').on('click', function(){
        console.log('do you work');
        const city = $("#city").val();
        getCityWeather(city);

        //Trying to add searched city to the local storage so 

        // var searchedCity = document.getElementById("#city");
        // localStorage.setItem(savedData, city.val());
        // console.log(savedData);

        // savedData.append(city);

    })
    function getCityWeather(city) {
        var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;

        

        fetch(weatherUrl)
        .then(function(response) {
            return response.json();
        })
            .then(function(data) {

                container.append(`<p>weather (for searched city): ${data.main.temp}</p>`);
                container.append(`<p>wind speed (for searched city): ${data.wind.speed}</p>`);
                container.append(`<p>humidity (for searched city): ${data.main.humidity}</p>`);
            })
            .then(function(){
                getFiveDay(city);
            })
    }
    function getFiveDay(city) {
        var weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey;


        

        fetch(weatherUrl)
        .then(function(response) {
            return response.json();
        })
            .then(function(response) {
                console.log(response);
                for(let i = 0; i<response.list.length; i+=8){
                    var data = response.list[i];
                    var container = $("<div></div>")
                    container.append(`<h4> ${data.dt_txt.slice}</h4>`);
                    container.append(`<p>weather (for searched city): ${data.main.temp}</p>`);
                    container.append(`<p>wind speed (for searched city): ${data.wind.speed}</p>`);
                    container.append(`<p>humidity (for searched city): ${data.main.humidity}</p>`);
                    forcastContainer.append(container);
                }

            })
    }
});
