import React from "react";
import axios from "axios";
import "./Weather.css";

export default function Weather() {
  let currentDate = new Date();

  let hours = currentDate.getHours();
  let minutes = ("0" + currentDate.getMinutes()).slice(-2);
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednsday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekShortDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = weekDays[currentDate.getDay()];

  let date = document.querySelector("#current-date");
  date.innerHTML = `${day}, ${hours}:${minutes}`;

  function search(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-text-input").value;
    let selectedCity = document.getElementById("selected-city");
    selectedCity.innerHTML = searchInput;
  }

  let form = document.querySelector("#search-form");
  form.addEventListener("submit", handleSubmit);

  function showWeather(response) {
    let temp = Math.round(response.data.main.temp);
    let city = response.data.name;
    let description = response.data.weather[0].main;
    let unitValue = "°C";

    let tempDisplay = document.querySelector("#current-temp");
    let unitsDisplay = document.querySelector("#celsius-link");
    let descriptionDisplay = document.querySelector("#weather-description");
    let cityDisplay = document.querySelector("#selected-city");
    let formDisplay = document.querySelector("#search-text-input");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let iconElement = document.querySelector("#daily-icon");

    tempDisplay.innerHTML = temp;
    unitsDisplay.innerHTML = unitValue;
    descriptionDisplay.innerHTML = `${description} in `;
    cityDisplay.innerHTML = city;
    formDisplay.placeholder = city;
    humidityElement.innerHTML = response.data.main.humidity;

    windElement.innerHTML = Math.round(response.data.wind.speed);

    iconElement.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);
  }

  function forecastWeather(response) {
    let cnt = 1;

    response.data.list.forEach((day) => {
      let weatherDate = new Date(day.dt_txt.replace(/ /g, "T"));

      if (
        (weatherDate > currentDate) &
        (weatherDate.getHours() === 12) &
        (cnt < 5)
      ) {
        let weekName = weekShortDays[weatherDate.getDay()];
        let weekTemp = Math.round(day.main.temp);
        let weekIcon = day.weather[0].icon;
        let weekIconDesc = day.weather[0].description;

        let shortWeekDisplay = document.querySelector(`#day-${cnt}`);
        let shortWeekTempDisplay = document.querySelector(`#day-temp-${cnt}`);
        let shortWeekIconElement = document.querySelector(`#day-icon-${cnt}`);

        shortWeekDisplay.innerHTML = weekName;
        shortWeekTempDisplay.innerHTML = weekTemp;
        shortWeekIconElement.classList.add("week-icon");
        shortWeekIconElement.setAttribute(
          "src",
          `https://openweathermap.org/img/wn/${weekIcon}@2x.png`
        );
        shortWeekIconElement.setAttribute("alt", weekIconDesc);

        cnt++;
      }
    });
  }

  function searchByCity(city) {
    let apiKey = "f5bebad10b3b825e71f74f7ce3f436a2";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
  }

  function searchByLocation(location) {
    let apiKey = "f5bebad10b3b825e71f74f7ce3f436a2";
    let lat = location.coords.latitude;
    let lon = location.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(url).then(showWeather);
  }

  function forecastByCity(city) {
    let apiKey = "f5bebad10b3b825e71f74f7ce3f436a2";
    let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(forecastWeather);
  }

  function forecastByLocation(location) {
    let apiKey = "f5bebad10b3b825e71f74f7ce3f436a2";
    let lat = location.coords.latitude;
    let lon = location.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&cnt=200`;
    axios.get(url).then(forecastWeather);
  }
  navigator.geolocation.getCurrentPosition(searchByLocation);
  navigator.geolocation.getCurrentPosition(forecastByLocation);

  function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#search-text-input").value;

    searchByCity(city);
    forecastByCity(city);
  }

  return (
    <div className="Weather">
      <div className="container mt-3">
        <div className="row g-0">
          <div className="col-8 border align-bottom-parent">
            <div className="p-3 align-bottom-text">
              <h1>
                <span id="current-temp"></span>
                <span className="font">
                  <span id="celsius-link"> </span>
                </span>
                <img src="" alt="" id="daily-icon" className="float-right" />
              </h1>
              <div className="float-right">
                <span>
                  <span id="weather-description"> </span>
                  <span id="selected-city"></span>
                </span>
              </div>
            </div>

            <div className="border-top p-3 align-bottom-child">
              <div id="current-date">10:15 - Sunday, 24 Oct 2021</div>
            </div>
          </div>
          <div className="col-4 border-bottom border-top border-end">
            <div className="border-bottom p-3">
              <form className="input-group float-top-right" id="search-form">
                <input
                  type="text"
                  className="form-control"
                  placeholder="City"
                  aria-label="city"
                  aria-describedby="basic-addon2"
                  id="search-text-input"
                  autocomplete="off"
                />
                <input
                  type="submit"
                  value="search"
                  className="input-group-text"
                  id="basic-addon2"
                />
              </form>
            </div>
            <div className="border-bottom p-3">
              <h4>Weather details</h4>
              <div className="row">
                <div className="col-8">
                  <div>Humidity</div>
                  <div>Wind</div>
                </div>
                <div className="col-4">
                  <div>
                    <span id="humidity"></span> %
                  </div>
                  <div>
                    <span id="wind"></span> km/hr
                  </div>
                </div>
              </div>
            </div>
            <div className="row p-3 g-2">
              <h4>Next Days</h4>

              <div className="col-3">
                <div className="shadow-sm bg-light pt-3 pb-3 text-center">
                  <div id="day-1"></div>
                  <img src="" alt="" id="day-icon-1" />
                  <div id="day-temp-1"></div>
                </div>
              </div>
              <div className="col-3">
                <div className="shadow-sm bg-light pt-3 pb-3 text-center">
                  <div id="day-2"></div>
                  <img src="" alt="" id="day-icon-2" />
                  <div id="day-temp-2"></div>
                </div>
              </div>
              <div className="col-3">
                <div className="shadow-sm bg-light pt-3 pb-3 text-center">
                  <div id="day-3"></div>
                  <img src="" alt="" id="day-icon-3" />
                  <div id="day-temp-3"></div>
                </div>
              </div>
              <div className="col-3">
                <div className="shadow-sm bg-light pt-3 pb-3 text-center">
                  <div id="day-4"></div>
                  <img src="" alt="" id="day-icon-4" />
                  <div id="day-temp-4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
