function searchCity (city) {
    // call API
let apiKey = "03bb378d4df0e4c5cat14b701460900o"
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
console.log (apiUrl);
}



function handleSearchSubmit (event) {
    event.preventDefault();
    let searchInput = document.querySelector ("#search-form-input");
    // console.log (searchInput.value); - check if function works when you type in the search input
    let cityElement = document.querySelector ("#city");
    cityElement.innerHTML = searchInput.value;
    searchCity (searchInput.value);
}


let searchFormElement = document.querySelector ("#search-form");
searchFormElement.addEventListener ("submit", handleSearchSubmit)