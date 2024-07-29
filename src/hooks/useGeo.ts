import { useQuery } from "@tanstack/react-query";
import { WeatherResponse } from "../types";
import { getCityState } from "../utils/helpers";
import { CITIES_API, WEATHER_API } from "../consts";

const RAPID_API_KEY = process.env.RAPID_API_KEY;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

interface CityGeo {
  city: string;
  name: string;
  countryCode: string;
  latitude: number;
  longitude: number;
}

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

async function fetchGeo(prefix: string) {
  const res = await fetch(`${CITIES_API}&namePrefix=${prefix}`, {
    method: "GET",
    headers: {
      "content-type": "application/json;charset=UTF-8",
      "x-rapidapi-key": RAPID_API_KEY,
      "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
    } as any,
  });
  const res_1 = await res.json();
  return {
    options: getUniqueCities(res_1.data).map((item: CityGeo) =>
      getCityState(item)
    ),
  };
}

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

function useWeather(lat: string, lon: string) {
  const query = useQuery<WeatherResponse>({
    queryKey: ["weather", lat, lon],
    queryFn: () => {
      return fetchWeather(lat, lon);
    },
  });

  return query;
}

export { useWeather, fetchGeo };
