import axios from "axios";

const API_KEY = "52f2ecf92a80747d378291f83cafb0ed";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

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
