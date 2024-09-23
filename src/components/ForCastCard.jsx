import React from "react";
import { farenheitConverter } from "../function/farenheitConverter";

export default function ForCastCard({ data, farenheit }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 m-2">
      <h3 className="text-xl font-semibold mb-2">Date & Time: {data.dt_txt}</h3>
      <div className="flex items-center justify-between">
        <span className="text-gray-700">
          Temp Min:{" "}
          {farenheit ? (
            <strong>{farenheitConverter(data.main.temp_min)}°F</strong>
          ) : (
            <strong>{data.main.temp_min}°C</strong>
          )}
        </span>
        <span className="text-gray-700">
          Temp Max:{" "}
          {farenheit ? (
            <strong>{farenheitConverter(data.main.temp_max)}°F</strong>
          ) : (
            <strong>{data.main.temp_max}°C</strong>
          )}
        </span>
        <img
          className="w-16 h-16"
          src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt="Weather Icon"
        />
      </div>
    </div>
  );
}
