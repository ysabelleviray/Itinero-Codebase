// WeatherCard.js
import React, { useState, useEffect } from "react";
import { getWeather } from "../api";

const WeatherCard = ({ lat, lng }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await getWeather(lat, lng);
      setWeather(data.current_weather);
    };

    fetchWeather();
  }, [lat, lng]);

  if (!weather) return <div>Loading weather...</div>;

  return (
    <div className="weather-card">
      <p>Temperature: {weather.temperature_2m}°C</p>
      <p>Condition: {weather.weathercode}</p>
    </div>
  );
};

export default WeatherCard;
