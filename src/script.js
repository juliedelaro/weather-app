let date = new Date();
let hour = date.getHours();
let minutes = date.getMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[date.getDay()];
let currentDateTime = document.querySelector(".dateTime");
currentDateTime.innerHTML = `${day}, ${hour}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col"><li class="futureDays">${formatDay(
        forecastDay.dt
      )}</li><img src="https://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }.png" id="icon" width="50" /></div>
      <div class="col"><span class= futureHigh>${Math.round(
        forecastDay.temp.max
      )}&deg;</span><span class="futureLow">/${Math.round(
          forecastDay.temp.min
        )}&deg;</span></div>`;
    }
  });

  forecastElement.innerHTML = forecastHTML + `</div>`;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "80eaf0f2f7c0ac14a85fb2a01d28b5a7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  document.querySelector(".citySearch").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#current-humidty").innerHTML =
    response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(event) {
  event.preventDefault();
  let input = document.querySelector("#city");
  document.querySelector(".citySearch").value;

  let apiKey = "80eaf0f2f7c0ac14a85fb2a01d28b5a7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}

function showCurrentWeather(response) {
  document.querySelector(".citySearch").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#current-humidty").innerHTML =
    response.data.main.humidity;

  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
}

function getCurrentLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  axios.get(url).then(showCurrentWeather);
}

function retrievePosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", retrievePosition);

let form = document.querySelector("form");
form.addEventListener("submit", search);

let currentTemp = document.querySelector("#current-temp");
