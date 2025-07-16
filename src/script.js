
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
    let maximumElement = document.querySelector("#maximum");
    let minimumElement = document.querySelector("minimum");
    
    
    // console.log(response.data);

// console.log(response.data.condition.description); - Check if description condition will refresh on page
    // minimumElement.innerHTML = `${response.data.temperature.minimum}°C`;
    maximumElement.innerHTML = `${response.data.temperature.maximum}°C`;
    
    iconElement.innerHTML = ` <img src="${response.data.condition.icon_url}" class="temperature-icon" />`
    cityElement.innerHTML = response.data.city;
    dayTimeElement.innerHTML = formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
    temperatureElement.innerHTML = Math.round(temperature);
    
}

function formatDate(date) {
    
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days [date.getDay()];

    if (minutes < 10) {
        minutes `0${minutes}`;
    }


    return `${day} ${hours}:${minutes}`;
}

// Function for refreshing City
function searchCity (city) {
    // call API
let apiKey = "03bb378d4df0e4c5cat14b701460900o"
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


let searchFormElement = document.querySelector ("#search-form");
searchFormElement.addEventListener ("submit", handleSearchSubmit);

// Default City that will appear when page is loaded
searchCity("Johannesburg");