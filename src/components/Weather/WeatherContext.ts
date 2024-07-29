import { createContext, useContext } from "react";
import { CityState, WeatherResponse } from "../../types";
import { WEATHER_API } from "../../consts";

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

async function fetchWeather(
  lat: string,
  lon: string
): Promise<WeatherResponse> {
  const res = await fetch(
    `${WEATHER_API}?units=metric&lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
  );
  const res_1 = await res.json();

  return res_1;
}

interface WeatherContext {
  addCityToFavorites: (city: CityState) => void;
  city: CityState | null;
  setCity: (city: CityState | null) => void;
  favorites: CityState[];
  removeCityFromFavorites: (city: CityState) => void;
}

const WeatherContext = createContext<WeatherContext | null>(null);

export function useWeatherContext() {
  const weather = useContext(WeatherContext);

  if (weather == null) {
    throw new Error("useWeatherContext must be used within a WeatherProvider");
  }

  return weather;
}

export default WeatherContext;
