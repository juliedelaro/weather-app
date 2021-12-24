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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Sat", "Sun", "Mon", "Tues", "Wed"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col"><li class="futureDays">${day}</li><span class="emoji">☀️</span></div>
      <div class="col"><span class= futureHigh>68&deg;</span><span class="futureLow">/46&deg;</span></div>`;
  });

  forecastElement.innerHTML = forecastHTML + `</div>`;
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

  fahrenheitTemp = response.data.main.temp;
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

function showCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  let celsiusTemp = (fahrenheitTemp - 32) * (5 / 9);
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let fahrenheitTemp = null;

function showfahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

let currentTemp = document.querySelector("#current-temp");

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showfahrenheit);

displayForecast();
