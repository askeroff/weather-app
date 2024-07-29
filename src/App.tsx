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

  const [lat, lon] = city ? city.value.split(" ") : ["", ""];
  const { addCity, favorites, removeCity } = useWeatherFavorites();

  const handleSelectFavorite = (city: CityState) => {
    setCity(city);
  };

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
        <SearchLocation city={city} setCity={setCity} />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Favorites />
          </Grid>
          <Grid item xs={8}>
            {city && <Weather />}
          </Grid>
        </Grid>
      </Box>
    </WeatherContext.Provider>
  );
}

export default App;
