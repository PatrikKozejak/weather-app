import { getWeatherData } from "./getWeatherData.js";

export function ScreenController() {
  const locationInput = document.getElementById("location");

  locationInput.addEventListener("change", async function (event) {
    displayCurrentWeatherData(
      await getWeatherData(handleError, event.target.value)
    );
  });
}

function displayCurrentWeatherData(weatherData) {
  let weatherLocationDiv = document.querySelector(".weather-location");
  let currentWeatherDiv = document.querySelector(".weather-current");
  weatherLocationDiv.style.display = "flex";
  currentWeatherDiv.style.display = "flex";

  const error = document.querySelector(".error-text");
  const location = document.querySelector(".resolved-location");
  const currentIcon = document.querySelector(".current-icon");
  const currentTemp = document.querySelector(".current-temperature-value");
  const currentTempScale = document.querySelector(".current-temperature-scale");
  const currentConditions = document.querySelector(".current-conditions");

  const currentPercipitation = document.querySelector(".current-precipitation");
  const currentWeatherDescription = document.querySelector(
    ".weather-current-desc"
  );

  error.innerHTML = "";
  location.textContent = weatherData.resolvedAddress;
  currentIcon.style.backgroundImage = `url('./assets/${weatherData.currentConditions.icon}.png')`;
  currentTemp.textContent = weatherData.currentConditions.temp;
  currentTempScale.textContent = "°C";
  currentConditions.textContent = weatherData.currentConditions.conditions;
  currentPercipitation.textContent = `${weatherData.currentConditions.precipprob}%`;
  currentWeatherDescription.textContent = weatherData.description;

  displayWeatherForecast(weatherData.days);
}

function displayWeatherForecast(weatherForecastData) {
  const weatherForecastDiv = document.querySelector(".weather-forecast");
  while (weatherForecastDiv.firstChild) {
    weatherForecastDiv.removeChild(weatherForecastDiv.firstChild);
  }

  for (let forecastDay = 0; forecastDay < 5; forecastDay++) {
    const isToday = forecastDay === 0 ? true : false;
    const forecastDayDiv = createForecastPreview(
      weatherForecastData[forecastDay],
      isToday
    );

    weatherForecastDiv.appendChild(forecastDayDiv);
  }
}

function createForecastPreview(dailyForecastData, isToday) {
  const dayForecastDiv = document.createElement("div");
  const forecastDateDiv = document.createElement("div");
  const iconDiv = document.createElement("div");
  const maxTempDiv = document.createElement("div");
  const minTempDiv = document.createElement("div");

  dayForecastDiv.classList.add("day-forecast");
  iconDiv.classList.add("weather-icon");

  const forecastDate = new Date(dailyForecastData.datetime);
  const weekDay = forecastDate.toDateString();

  forecastDateDiv.textContent = isToday ? "Today" : weekDay.substring(0, 3);
  iconDiv.style.backgroundImage = `url('./assets/${dailyForecastData.icon}.png')`;
  maxTempDiv.textContent = `${dailyForecastData.tempmax}°`;
  minTempDiv.textContent = `${dailyForecastData.tempmin}°`;

  dayForecastDiv.appendChild(forecastDateDiv);
  dayForecastDiv.appendChild(iconDiv);
  dayForecastDiv.appendChild(maxTempDiv);
  dayForecastDiv.appendChild(minTempDiv);

  return dayForecastDiv;
}

function handleError(errorMessage) {
  const error = document.querySelector(".error-text");
  const weatherWidget = document.querySelector(".weather-widget");

  weatherWidget.style.display = "none";
  error.textContent = errorMessage;
}
