$( document ).ready(function() {
    console.log( "ready!" );

    var currentDateContainer = document.getElementById("currentDay");

    var currentDate = new Date();   

    currentDateContainer.innerHTML = currentDate;
    var currentHour = currentDate.getHours()
    console.log(currentHour);

    var container = document.querySelector('#cityWeather');
    var div = document.createElement('div');

    container.append(div);

    $('#search').on('click', function(){
        console.log('do you work');
    })

});