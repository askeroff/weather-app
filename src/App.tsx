import React, { useState } from "react";

import Weather from "./components/Weather/Weather";
import SearchLocation from "./components/SearchLocation";
import { CityState } from "./types";
import { useWeatherFavorites } from "./hooks/useStorage";
import Favorites from "./components/Favorites";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import WeatherContext from "./components/Weather/WeatherContext";

function App() {
  const [city, setCity] = useState<CityState | null>(null);

  const { addCity, favorites, removeCity } = useWeatherFavorites();

  const handleSettingCity = (city: CityState | null) => {
    setCity(city);
  };

  return (
    <WeatherContext.Provider
      value={{
        addCityToFavorites: addCity,
        city,
        setCity: handleSettingCity,
        favorites,
        removeCityFromFavorites: removeCity,
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <SearchLocation />
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Favorites />
          </Grid>
          <Grid item xs={12} md={8}>
            {city && <Weather />}
          </Grid>
        </Grid>
      </Box>
    </WeatherContext.Provider>
  );
}

export default App;
