// Weather Code to Text and Icon Mapping
const weatherCodes = {
    0: { text: "Clear Sky", icon: "fa-sun", class: "" },
    1: { text: "Mainly Clear", icon: "fa-sun", class: "" },
    2: { text: "Partly Cloudy", icon: "fa-cloud-sun", class: "icon-cloud" },
    3: { text: "Overcast", icon: "fa-cloud", class: "icon-cloud" },
    45: { text: "Foggy", icon: "fa-smog", class: "icon-cloud" },
    51: { text: "Light Drizzle", icon: "fa-cloud-rain", class: "icon-rain" },
    61: { text: "Rain", icon: "fa-cloud-showers-heavy", class: "icon-rain" },
    71: { text: "Snow", icon: "fa-snowflake", class: "icon-rain" },
    80: { text: "Rain Showers", icon: "fa-cloud-rain", class: "icon-rain" },
    95: { text: "Thunderstorm", icon: "fa-bolt", class: "icon-thunder" }
};

// Form Submit Handler
function getWeather(event) {
    event.preventDefault();
    const city = document.getElementById("cityInput").value.trim();
    if (city) {
        fetchWeatherData(city);
    }
}

// Fetch Weather Data using AJAX (Fetch API) & JSON
async function fetchWeatherData(city) {
    const loading = document.getElementById("loading");
    const errorBox = document.getElementById("error");
    const weatherBody = document.getElementById("weatherBody");

    // Show loading state
    loading.style.display = "flex";
    errorBox.style.display = "none";
    weatherBody.style.opacity = "0.3";

    try {
        // 1. Geocoding API: Convert City Name to Latitude & Longitude
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
        const geoRes = await fetch(geoUrl);
        const geoData = await geoRes.json();

        if (!geoData.results || geoData.results.length === 0) {
            throw new Error("City not found. Try another name.");
        }

        const location = geoData.results[0];
        const lat = location.latitude;
        const lon = location.longitude;
        const cityName = `${location.name}, ${location.country || ""}`;

        // 2. Weather API: Fetch Current Weather using Coordinates
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`;
        const weatherRes = await fetch(weatherUrl);
        const weatherData = await weatherRes.json();

        const current = weatherData.current;

        // 3. Display Data in HTML
        document.getElementById("location").textContent = cityName;
        document.getElementById("temp").textContent = Math.round(current.temperature_2m);
        document.getElementById("humidity").textContent = `${current.relative_humidity_2m}%`;
        document.getElementById("wind").textContent = `${current.wind_speed_10m} km/h`;

        // Weather condition & icon
        const condition = weatherCodes[current.weather_code] || {
            text: "Clear",
            icon: "fa-sun",
            class: ""
        };

        document.getElementById("condition").textContent = condition.text;
        const iconEl = document.getElementById("weatherIcon");
        iconEl.className = `fas ${condition.icon} weather-icon ${condition.class}`;

        weatherBody.style.opacity = "1";
    } catch (err) {
        document.getElementById("errorText").textContent = err.message;
        errorBox.style.display = "flex";
        weatherBody.style.opacity = "1";
    } finally {
        loading.style.display = "none";
    }
}

// Initial Load: Fetch default weather for Puducherry
document.addEventListener("DOMContentLoaded", () => {
    fetchWeatherData("Puducherry");
});
