// let weather = {
//   paris: {
//     temp: 19.7,
//     humidity: 80,
//   },
//   tokyo: {
//     temp: 17.3,
//     humidity: 50,
//   },
//   lisbon: {
//     temp: 30.2,
//     humidity: 20,
//   },
//   "san francisco": {
//     temp: 20.9,
//     humidity: 100,
//   },
//   moscow: {
//     temp: -5,
//     humidity: 20,
//   },
// };

// // write your code here
// let city = prompt("Enter a city");
// city = city.toLowerCase();
// if (weather[city] !== undefined) {
//   let celsius = Math.round(weather[city].temp);
//   let farenheit = Math.round((weather[city].temp * 9) / 5 + 32);
//   alert(
//     `It is currently ${celsius} °C (${farenheit} °F) in ${city} with a humidity of ${weather[city].humidity}%`
//   );
// } else {
//   alert(
//     `Sorry, we do not know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
//   );
// }

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
console.log(day);
let currentDateTime = document.querySelector(".dateTime");
currentDateTime.innerHTML = `${day}, ${hour}:${minutes}`;

// 👨‍🏫Your task
// On your project, when a user searches for a city (example: New York),
// it should display the name of the city on the result page and the
// current temperature of the city.

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
  currentTemp.innerHTML = "27°";
}

function showFarenheit(event) {
  event.preventDefault();
  currentTemp.innerHTML = "80°";
}

let currentTemp = document.querySelector("#current-temp");

let celsiusTemp = document.querySelector("#celsius");
celsiusTemp.addEventListener("click", showCelsius);

let farenheitTemp = document.querySelector("#farenheit");
farenheitTemp.addEventListener("click", showFarenheit);
