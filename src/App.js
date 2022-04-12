import React from "react";
import Weather from "./Weather";

import "./App.css";

export default function App() {
  return (
    <div className="App">
      <Weather />
      <footer>
        <a
          href="https://github.com/LeaPapadopoulos/weather-app-react"
          target="_blank"
        ></a>
      </footer>
    </div>
  );
}
