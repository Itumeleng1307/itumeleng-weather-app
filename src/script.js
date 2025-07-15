
// Function for refreshing Temperature & City
function refreshWeather(response) {
    let temperatureElement = document.querySelector ("#temperature");
    let temperature = response.data.temperature.current;
    // console.log(response.data.temperature.current); - Check if temperature will update in console & screen
    let cityElement = document.querySelector ("#city");
    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = Math.round(temperature);
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
searchCity("Johannesburg")