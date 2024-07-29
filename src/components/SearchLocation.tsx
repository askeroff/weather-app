import React from "react";

import { Dispatch, SetStateAction } from "react";

import { CityState } from "../types";
import { fetchGeo } from "../hooks/useGeo";
import { AsyncPaginate } from "react-select-async-paginate";
import { DEBOUNCE_INPUT_TIMEOUT } from "../consts";

interface SearchLocationProps {
  city: CityState | null;
  setCity: Dispatch<SetStateAction<CityState | null>>;
}

export default function SearchLocation(props: SearchLocationProps) {
  const { city, setCity } = props;

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
