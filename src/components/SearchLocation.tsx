import React from "react";

import { AsyncPaginate } from "react-select-async-paginate";
import { DEBOUNCE_INPUT_TIMEOUT } from "../consts";
import { useWeatherContext } from "./Weather/WeatherContext";
import fetchGeo from "../hooks/useGeo";

export default function SearchLocation() {
  const { city, setCity } = useWeatherContext();

  const handleOnChange = (searchData: any) => {
    setCity(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Enter a city name"
      debounceTimeout={DEBOUNCE_INPUT_TIMEOUT}
      value={city}
      onChange={handleOnChange}
      loadOptions={(inputValue: string) => {
        return fetchGeo(inputValue);
      }}
    />
  );
}
