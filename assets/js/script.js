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

        //localStorage.setItem(savedData, city.val());

    })
    function savedCity(city) {
        var searchedCity = JSON.parse(localStorage.getItem('city')) || []; // Get the data from localStorage and if I can't find it start with an empty array

        // if city is not in the localstorage, push it into the array
        //else(if city is in localStorage), don't push it

        searchedCity.push(city);
        localStorage.setItem('city', JSON.stringify(searchedCity));
        savedData.append(city);
    }

    var previousSearch = JSON.parse(localStorage.getItem('city'));

    for (i=0 ; i < previousSearch.length; i++) {

        var savedSearch = document.createElement('li');
        savedSearch.textContent = previousSearch[i];
        savedData.append(savedSearch);
        
    }


    savedData.on('click', function (event) {
        console.log(event.target.textContent)
        getCityWeather(event.target.textContent)
    } )
    


    function getCityWeather(city) {
        var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;


        fetch(weatherUrl)
        .then(function(response) {
            return response.json();
        })
            .then(function(data) {
                container.empty()
                savedCity(city);
                console.log(city);
                container.append(`<p>Weather for ${city}: ${data.main.temp}</p>`);
                container.append(`Wind speed for ${city}: ${data.wind.speed}</p>`);
                container.append(`Humidity for ${city}: ${data.main.humidity}</p>`);
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
                forcastContainer.empty()
                console.log(response);
                for(let i = 0; i<response.list.length; i+=8){
                    var data = response.list[i];
                    var container = $("<div></div>")
                    //append the date and then append the variable - in day js
                    container.append(`<h4> ${data.dt_txt}</h4>`);
                    container.append(`<p>weather (for searched city): ${data.main.temp}</p>`);
                    container.append(`<p>wind speed (for searched city): ${data.wind.speed}</p>`);
                    container.append(`<p>humidity (for searched city): ${data.main.humidity}</p>`);
                    forcastContainer.append(container);
                }

            })
    }
});

