import React from "react";

export default function FormattedDate(props) {
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
    let day = weekDays[currentDate.getDay()];

    // let date = document.querySelector("#current-date");
    // date.innerHTML = `${day}, ${hours}:${minutes}`;

      return (
        <div>
          {day}, {hours}:{minutes}
        </div>
      );
}