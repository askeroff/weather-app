import { useQuery } from "@tanstack/react-query";
import { WEATHER_API } from "../consts";
import { WeatherResponse } from "../types";

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

async function fetchWeather(
  lat: string,
  lon: string
): Promise<WeatherResponse> {
  const res = await fetch(
    `${WEATHER_API}?units=metric&lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
  );
  const json = await res.json();

  return json;
}

export default function useWeather(lat: string, lon: string) {
  const query = useQuery<WeatherResponse>({
    queryKey: ["weather", lat, lon],
    queryFn: () => {
      return fetchWeather(lat, lon);
    },
  });

  return query;
}
