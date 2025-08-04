const apiKey = "665PKK7Z4U3D7ULDJUF8THHZ9";
let city = "New York"; // Example location
const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=${apiKey}&contentType=json`;
const cityName = document.getElementById("cityName");
const weatherTemperature = document.getElementById("temperature");
const weatherDescription = document.getElementById("description");
const weatherHumidity = document.getElementById("humidity");
const weatherWindSpeed = document.getElementById("windSpeed");
const inputCity = document.getElementById("city");
const searchButton = document.getElementById("searchBtn");

searchButton.addEventListener("click", () => {
    city = inputCity.value.trim();
    const encodedCity = encodeURIComponent(city);
    if (city) {
        const newApiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodedCity}?unitGroup=${unit}&key=${apiKey}&contentType=json`;
        displayWeather(newApiUrl);
        console.log(`Fetching weather for: ${city} in ${isCelsius ? "Celsius" : "Fahrenheit"}`);
    } else {
        alert("Please enter a city name.");
    }
});



let unit = "us"; // Default: Fahrenheit
let isCelsius = false;

const unitToggle = document.getElementById("unitToggle");

unitToggle.addEventListener("click", () => {
    isCelsius = !isCelsius;
    unit = isCelsius ? "metric" : "us";
    unitToggle.textContent = isCelsius ? "Show in °F" : "Show in °C";

    const currentCity = inputCity.value.trim() || "New York";
    const encodedCity = encodeURIComponent(currentCity);
    const newApiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodedCity}?unitGroup=${unit}&key=${apiKey}&contentType=json`;
    displayWeather(newApiUrl);
})

async function fetchWeatherData(url) {
    try {
        const response = await fetch(url, { mode: "cors" });
        let data = await response.json();
        console.log("Raw data received:", data);
        if (!data || !data.currentConditions) {
            throw new Error("Invalid data received from the weather service.");
        }

        return {
            cityName: data.address,
            temperature: data.currentConditions.temp,
            description: data.currentConditions.conditions,
            humidity: data.currentConditions.humidity,
            windSpeed: data.currentConditions.windspeed,
        };
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
}


async function displayWeather(url) {
    const weatherData = await fetchWeatherData(url);
    console.log("Weather Data:", weatherData);
    if (weatherData) {
        cityName.textContent = `${weatherData.cityName}`;
        weatherTemperature.textContent = `Temperature: ${weatherData.temperature} °${isCelsius ? 'C' : 'F'}`;
        weatherDescription.textContent = `Description: ${weatherData.description}`;
        weatherHumidity.textContent = `Humidity: ${weatherData.humidity}%`;
        weatherWindSpeed.textContent = `Wind Speed: ${weatherData.windSpeed} ${isCelsius ? 'kmh' : 'mph'}`;
    }/* else {
        weatherContainer.textContent = "Could not load weather for that city.";
        weatherTemperature.textContent = "";
        weatherDescription.textContent = "";
        weatherHumidity.textContent = "";
        weatherWindSpeed.textContent = "";
    }  */
}