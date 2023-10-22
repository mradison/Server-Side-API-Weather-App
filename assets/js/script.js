//This is the API key that we need to access the data from the weather app API

const apiKey = "cd21aa2fdd5a548e8d8915692b4f694a";

//This is where we create a function so the page displays the current day and time

$(document).ready(function () {
    console.log("ready!");

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

    $('#search').on('click', function () {
        console.log('do you work');
        const city = $("#city").val();
        getCityWeather(city);

    })

    function savedCity(city) {
        var searchedCity = JSON.parse(localStorage.getItem('city')) || [];

        if (searchedCity.includes(city) === false) {
            console.log('not in arrray')
            searchedCity.push(city);
            localStorage.setItem('city', JSON.stringify(searchedCity));
            var savedSearch = document.createElement('li');
            savedSearch.textContent = city;
            savedData.append(savedSearch);
        } else {
            console.log('in array');
        }
    }
    var previousSearch = JSON.parse(localStorage.getItem('city'));

    for (i = 0; i < previousSearch.length; i++) {
        var savedSearch = document.createElement('li');
        savedSearch.textContent = previousSearch[i];
        savedData.append(savedSearch);
    }

    savedData.on('click', function (event) {
        console.log(event.target.textContent)
        getCityWeather(event.target.textContent)
    })

    function getCityWeather(city) {
        var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;

        fetch(weatherUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                container.empty()
                savedCity(city);
                console.log(city);

                var icon = data.weather[0].icon;

                container.append(`<img src="https://openweathermap.org/img/wn/${icon}@2x.png"> </img>`)
                container.append(`<p>Weather for ${city}: ${data.main.temp}</p>`);
                container.append(`Wind speed for ${city}: ${data.wind.speed}</p>`);
                container.append(`Humidity for ${city}: ${data.main.humidity}</p>`);
            })
            .then(function () {
                getFiveDay(city);
            })

    }
    function getFiveDay(city) {
        var weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey;

        fetch(weatherUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                forcastContainer.empty()
                console.log(response);
                for (let i = 0; i < response.list.length; i += 8) {
                    var data = response.list[i];
                    var container = $("<div></div>")

                    var forecastIcon = data.weather[0].icon;

                    container.append(`<img src="https://openweathermap.org/img/wn/${forecastIcon}@2x.png"> </img>`)

                    container.append(`<h4> ${data.dt_txt}</h4>`);
                    container.append(`<p>weather for ${city}: ${data.main.temp}</p>`);
                    container.append(`<p>wind speed for ${city}: ${data.wind.speed}</p>`);
                    container.append(`<p>humidity (for searched city): ${data.main.humidity}</p>`);
                    forcastContainer.append(container);
                }

            })
    }
});

