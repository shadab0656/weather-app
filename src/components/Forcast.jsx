import React, { useEffect, useState } from "react";
import axios from "axios";
import ForCastCard from "./ForCastCard";

const API_KEY = "52f2ecf92a80747d378291f83cafb0ed";
const BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";

export const getWeather = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

export default function Forcast({ city, farenheit }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getWeather(city);
        setWeather(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeather();
  }, [city]);
  //   console.log(weather, "lololo");
  return (
    <div className="flex flex-wrap justify-center">
      {weather?.list?.map((item, i) => (
        <ForCastCard key={i} data={item} farenheit={farenheit} />
      ))}
    </div>
  );
}
