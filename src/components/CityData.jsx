import React, { useEffect, useState, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { getWeather } from "../function/getWeather";
// import Forcast from "./Forcast";
import { farenheitConverter } from "../function/farenheitConverter";
const Forcast = lazy(() => import("./Forcast"));
export default function CityData() {
  // const { pathname } = useLocation();
  const { id } = useParams();
  const urlParam = id?.replace(/-/g, " ");
  const [weather, setWeather] = useState(null);
  const [farenheit, setFarenheit] = useState(false);

  const [city, setCity] = useState(urlParam || "New Delhi");
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getWeather(city);
        setWeather(data);
      } catch (error) {
        console.error(error);
      }
    };

    // Update city if urlParam changes and fetch weather
    if (urlParam) {
      setCity(urlParam);
    }
    fetchWeather();
  }, [urlParam, city]);
  return (
    <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
      <div className="flex gap-8">
        {" "}
        <h1 className="text-2xl font-bold mb-4">Weather in {city}</h1>
        {!farenheit ? (
          <button
            className="flex items-center bg-blue-500 text-white px-4 py-1 rounded-lg shadow hover:bg-blue-600 transition duration-300"
            onClick={() => setFarenheit(true)}
          >
            To Farenheit
          </button>
        ) : (
          <button
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300"
            onClick={() => setFarenheit(false)}
          >
            To Celcuis
          </button>
        )}
      </div>
      {weather ? (
        <div className="flex items-center mb-6">
          <div className="mr-4">
            <h2 className="text-lg font-semibold">
              {farenheit
                ? `Temperature: ${farenheitConverter(weather.main.temp)}°F`
                : `Temperature: ${weather.main.temp}°C`}
            </h2>
            <h2 className="text-lg text-gray-700">
              Weather: {weather.weather[0].description}
            </h2>
          </div>
          <img
            className="w-24 h-24"
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Weather Icon"
          />
        </div>
      ) : (
        <p className="text-gray-500">Loading...</p>
      )}
      <Suspense fallback={<p>Loading forecast...</p>}>
        <Forcast city={city} farenheit={farenheit} />
      </Suspense>
    </div>
  );
}
