// Get DOM elements
const locationInput = document.getElementById("locationInput");
const searchButton = document.getElementById("searchButton");
const locationName = document.getElementById("locationName");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");


const storedLocation = localStorage.getItem("location");

if (storedLocation) {
    locationInput.value = storedLocation;
    getWeather(storedLocation);
}


searchButton.addEventListener("click", () => {
    const userLocation = locationInput.value.trim();
    if (userLocation) {
        getWeather(userLocation);
       
        localStorage.setItem("location", userLocation);
    }
});


function getWeather(location) {
    const apiKey = "YOUR_OPENWEATHERMAP_API_KEY";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            if (data.cod === 200) {
                locationName.textContent = data.name;
                temperature.textContent = data.main.temp;
                condition.textContent = data.weather[0].description;
            } else {
                alert("Location not found. Please try again.");
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
}


displayWeather("NewYork");

