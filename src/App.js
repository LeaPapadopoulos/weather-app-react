import React from "react";
import Weather from "./Weather";

import "./App.css";

export default function App() {
  return (
    <div className="container mt-3">
      <Weather />
      <footer>
        <a
          href="https://github.com/LeaPapadopoulos/weather-app-react"
          target="_blank"
          rel="noreferrer"
        >
          Open source code
        </a>
        , by Lea
      </footer>
    </div>
  );
}
