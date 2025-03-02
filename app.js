const apiKey = "4cba1a6d7be1874646efdf9388a86eb5";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

document.querySelector(".search button").addEventListener("click", () => {
    const city = document.querySelector(".search input").value;
    fetchWeather(city);
});

document.querySelector(".search input").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const city = document.querySelector(".search input").value;
        fetchWeather(city);
    }
});

async function fetchWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();
        updateWeatherUI(data);
    } catch (error) {
        alert(error.message);
    }
}

function updateWeatherUI(data) {
    document.querySelector(".city").innerText = data.name;
    document.querySelector(".temp").innerText = `${Math.round(data.main.temp)}°C`;
    document.querySelector(".humidity").innerText = `${data.main.humidity}%`;
    document.querySelector(".wind").innerText = `${data.wind.speed} km/h`;
    
    const weatherIcon = document.querySelector(".weather-icon");
    const weatherCondition = data.weather[0].main.toLowerCase();
    const temperature = data.main.temp;
    
    if (temperature > 25) {
        weatherIcon.src = "image.png"; 
    } else if (weatherCondition.includes("cloud")) {
        weatherIcon.src = "clouds.png";
    } else if (weatherCondition.includes("rain")) {
        weatherIcon.src = "rain.png";
    } else if (weatherCondition.includes("clear")) {
        weatherIcon.src = "clear.png";
    } else if (weatherCondition.includes("drizzle")) {
        weatherIcon.src = "drizzle.png";
    } else if (weatherCondition.includes("snow")) {
        weatherIcon.src = "snow.png";
    } else if (weatherCondition.includes("mist")) {
        weatherIcon.src = "mist.png";
    } else {
        weatherIcon.src = "default.png"; 
    }
}

