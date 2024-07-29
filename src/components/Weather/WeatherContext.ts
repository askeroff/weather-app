import { createContext, useContext } from "react";
import { CityState } from "../../types";

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
