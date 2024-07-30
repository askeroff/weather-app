import { CityGeo, WeatherResponse } from "../types";

export function getCityState(item: CityGeo) {
  return {
    value: `${item.latitude} ${item.longitude}`,
    label: `${item.name}, ${item.country}`,
  };
}

function convertToFahrenheit(celcius: number) {
  return (celcius * (9 / 5) + 32).toFixed(2);
}

export function toggleMetric(data: WeatherResponse, metric: boolean) {
  return {
    ...data,
    main: {
      ...data.main,
      temp_max: metric
        ? data.main.temp_max
        : convertToFahrenheit(data.main.temp_max),
      temp_min: metric
        ? data.main.temp_min
        : convertToFahrenheit(data.main.temp_min),
    },
  };
}
