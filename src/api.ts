import { getCityState } from "./utils/helpers";
import { CITIES_API, WEATHER_API } from "./consts";
import { CityGeo, WeatherResponse } from "./types";

const RAPID_API_KEY = process.env.RAPID_API_KEY;

function getUniqueCities(data: CityGeo[]) {
  let hash: any = {};
  let result = [];

  for (let i = 0; i < data.length; i++) {
    let city = data[i];
    if (hash[city.name] == undefined) {
      result.push(city);
      hash[city.name] = true;
    }
  }

  return result;
}

// to refactor, file name not corresponds to the actual implementation
export async function fetchGeo(prefix: string) {
  const res = await fetch(`${CITIES_API}&namePrefix=${prefix}`, {
    method: "GET",
    headers: {
      "content-type": "application/json;charset=UTF-8",
      "x-rapidapi-key": RAPID_API_KEY,
      "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
    } as any,
  });
  const json = await res.json();
  return {
    options: getUniqueCities(json.data).map((item: CityGeo) =>
      getCityState(item)
    ),
  };
}

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

export async function fetchWeather(
  lat: string,
  lon: string
): Promise<WeatherResponse> {
  const res = await fetch(
    `${WEATHER_API}?units=metric&lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
  );
  const json = await res.json();

  return json;
}
