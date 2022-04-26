import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";
import FormattedDate from "./FormattedDate";
import WeatherForecast from "./WeatherForecast";


export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);

  
  function handleResponse(response) {
    setWeatherData({
      ready: true,
      coordinates: response.data.coord,
      temperature: Math.round(response.data.main.temp),
      humidity: response.data.main.humidity,
      date: new Date(response.data.dt * 1000),
      description: response.data.weather[0].main,
      icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      wind: Math.round(response.data.wind.speed),
      city: response.data.name,
    });
  }

  function searchByCity() {
    let apiKey = "f5bebad10b3b825e71f74f7ce3f436a2";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  }

  function searchByLocation(location) {
    let apiKey = "f5bebad10b3b825e71f74f7ce3f436a2";
    let lat = location.coords.latitude;
    let lon = location.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(url).then(handleResponse);
  }


  function handleSubmit(event) {
    event.preventDefault();

    searchByCity();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  if (weatherData.ready) {
    return (
      <div className="row g-0">
        <div className="col-8 border align-bottom-parent">
          <div className="p-3 align-bottom-text">
            <h1>
              <span id="current-temp">{weatherData.temperature}</span>
              <span className="celsius-font">
                <span id="celsius-link"> °C</span>
              </span>
              <img src={weatherData.icon} alt="" id="daily-icon" className="float-right" />
            </h1>
            <div className="float-right">
              <span>
                <span id="weather-description">
                  {weatherData.description} in{" "}
                </span>
                <span id="selected-city">{weatherData.city}</span>
              </span>
            </div>
          </div>

          <div className="border-top p-3 align-bottom-child">
            <div id="current-date">
              <FormattedDate date={props.date} />
            </div>
          </div>
        </div>
        <div className="col-4 border-bottom border-top border-end">
          <div className="border-bottom p-3">
            <form
              onSubmit={handleSubmit}
              className="input-group float-top-right"
              id="search-form"
            >
              <input
                type="text"
                className="form-control"
                placeholder={weatherData.city}
                aria-label="city"
                aria-describedby="basic-addon2"
                id="search-text-input"
                autoComplete="off"
                onChange={handleCityChange}
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
                  <span id="humidity">{weatherData.humidity}</span> %
                </div>
                <div>
                  <span id="wind">{weatherData.wind}</span> km/hr
                </div>
              </div>
            </div>
          </div>
          <WeatherForecast coordinates={weatherData.coordinates} />
        </div>
      </div>
    );
  } else {
    navigator.geolocation.getCurrentPosition(searchByLocation);
    return "Loading...";
  }
}
