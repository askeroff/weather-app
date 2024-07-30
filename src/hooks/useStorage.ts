// useLocalStorage.js
import { useState, useEffect } from "react";
import { getItem, setItem } from "../utils/storage";
import { CityState } from "../types";

const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = getItem(key);
      return item !== null ? item : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = <T>(value: T) => {
    try {
      setStoredValue(value);
      setItem(key, value);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setValue(storedValue);
  }, [key]);

  return [storedValue, setValue];
};

export function useWeatherFavorites() {
  const [favorites, setFavorites] = useLocalStorage<CityState[]>(
    "favorites",
    []
  );

  const addCity = (city: CityState) => {
    const alreadyHas = favorites.find(
      (existing: CityState) => existing.value == city.value
    );
    if (alreadyHas) {
      // add notifications system
      console.log("ALREADY EXISTS");

      return;
    }
    const newFavorites = [...favorites, city];

    setFavorites(newFavorites);
  };

  const removeCity = (city: CityState) => {
    const newFavorites = favorites.filter(
      (existing: CityState) => existing.value !== city.value
    );

    setFavorites(newFavorites);
  };

  return { addCity, removeCity, favorites };
}

export default useLocalStorage;
