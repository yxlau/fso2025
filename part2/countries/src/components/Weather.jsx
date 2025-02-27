import WeatherService from "../services/WeatherService";
import { useState, useEffect } from "react";

const Weather = ({ countryData }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    WeatherService.get(countryData.latlng[0], countryData.latlng[1]).then(
      (response) => setWeather(response)
    );
  }, [countryData]);

  if (!weather) {
    return <div></div>;
  }

  return (
    <div>
      <h2>Weather in {countryData.name.common}</h2>
      <div>Temperature {weather.main.temp} celsius</div>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
      />
      <div>Wind {weather.wind.speed} m/s</div>
    </div>
  );
};

export default Weather;
