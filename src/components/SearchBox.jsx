import React, { useEffect, useRef, useState } from "react";
import { getWeather } from "../function/getWeather"; // Assume this function fetches weather data
import { Link } from "react-router-dom";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const cityArr = [
    "New York",
    "London",
    "Tokyo",
    "Paris",
    "Berlin",
    "Sydney",
    "Mumbai",
    "Toronto",
    "Moscow",
    "Cape Town",
    "Buenos Aires",
    "Dubai",
    "Los Angeles",
    "Rio de Janeiro",
    "Beijing",
    "Mexico City",
    "Seoul",
    "Lagos",
    "Rome",
    "Istanbul",
  ];
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef(null);
  useEffect(() => {
    const fetchWeather = async (city) => {
      try {
        const data = await getWeather(city);
        setWeather(data);
        setError("");
      } catch (err) {
        console.error(err);
        setError("City not found.");
      }
    };

    if (query) {
      fetchWeather(query);
    }
  }, [query]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(value.length > 0);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div>
      <div className="search-box">
        <input
          className="p-3"
          type="text"
          value={query}
          placeholder="Search cities"
          onChange={handleInputChange}
        />
        {showSuggestions && (
          <ul className="suggestions-list" ref={suggestionsRef}>
            {query.length > 2 && error && (
              <>
                <b className="error error-search">{error}</b>

                <b className="text-center">You can check for </b>
              </>
            )}
            {cityArr.map((city, index) => (
              <Link
                to={city.replace(/\s+/g, "-")}
                key={index}
                onClick={() => setShowSuggestions(false)}
              >
                {city}
              </Link>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
