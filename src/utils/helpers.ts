import { CityGeo } from "../types";

export function getCityState(item: CityGeo) {
  return {
    value: `${item.latitude} ${item.longitude}`,
    label: `${item.name} ${item.countryCode}`,
  };
}
