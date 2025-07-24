
// Function for refreshing Temperature & City
function refreshWeather(response) {
    let temperatureElement = document.querySelector ("#temperature");
    let temperature = response.data.temperature.current;
    // console.log(response.data.temperature.current); - Check if temperature will update in console & screen
    let cityElement = document.querySelector ("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let dayTimeElement = document.querySelector("#day-time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icons");
   

    
    
    // console.log(response.data);

// console.log(response.data.condition.description); - Check if description condition will refresh on page
    iconElement.innerHTML = ` <img src="${response.data.condition.icon_url}" class="temperature-icon" />`
    cityElement.innerHTML = response.data.city;
    dayTimeElement.innerHTML = formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
    temperatureElement.innerHTML = Math.round(temperature);

    getForecast(response.data.city);
}

function formatDate(date) {
    
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days [date.getDay()];

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }


    return `${day} ${hours}:${minutes}`;
}

// Function for refreshing City
function searchCity (city) {
    // call API
let apiKey = "fbef01f4et1b02o0d25c27210a43ef3f"
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
// console.log (apiUrl); - check if API works (City changes and the console shows all information about the weather)
axios.get (apiUrl).then(refreshWeather)
}



function handleSearchSubmit (event) {
    event.preventDefault();
    let searchInput = document.querySelector ("#search-form-input");
    // console.log (searchInput.value); - check if function works when you type in the search input
    
    searchCity (searchInput.value);
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

    return days [date.getDay()];


}

function getForecast (city) {
let apiKey = "fbef01f4et1b02o0d25c27210a43ef3f";
let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}}&key=${apiKey}&units=metric`; 
// console.log(apiUrl) 
// - check if apiUrl is working
axios.get (apiUrl). then(displayForecast)
}


function displayForecast(response) {
    // console.log(response.data);
    let upcomingHtml = "";

    response.data.daily.forEach(function (day, index) {
        if (index < 5 ) {
    // only display days with Values 0-5 (index)
    upcomingHtml = 
    upcomingHtml +
    `
    <div class="weather-forecast-day">
        <div class="forecast-day">${formatDay(day.time)}</div>
        <img src ="${day.condition.icon_url}" class="forecast-icon"/>
        <div class="forecast-highs-lows">
            <div class="forecast-high-low">
                <strong>${Math.round (day.temperature.maximum)}°C</strong>
            </div>
            <div class="forecast-high-low">${Math.round(day.temperature.minimum)}°C</div>
        </div>
    </div>`;
       }

    })

let upcomingElement = document.querySelector("#upcoming");
upcomingElement.innerHTML= upcomingHtml

}

let searchFormElement = document.querySelector ("#search-form");
searchFormElement.addEventListener ("submit", handleSearchSubmit);

// Default City & Forecast that will appear when page is loaded  - calling the function
searchCity("Johannesburg");

