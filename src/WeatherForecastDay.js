import React from "react";

export default function WeatherForecastDay(props) {
  function dayTemperature() {
    let temperature = Math.round(props.data.temp.day);
    return `${temperature}°`;
  }

  function tempIcon(){
      let icon = props.data.weather[0].icon;
      return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  }

  function day() {
    let date = new Date(props.data.dt * 1000);
    let day = date.getDay();

    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
  }

  return (
    <div className="shadow-sm bg-light pt-3 pb-3 text-center">
      <div> {day()}</div>
      <img src={tempIcon()} alt="" id="day-icon-1" class="week-icon" />
      <div>{dayTemperature()}</div>
    </div>
  );


}
