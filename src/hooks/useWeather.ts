import { useQuery } from "@tanstack/react-query";
import { WeatherResponse } from "../types";
import { fetchWeather } from "../api";

export default function useWeather(lat: string, lon: string) {
  const query = useQuery<WeatherResponse>({
    queryKey: ["weather", lat, lon],
    queryFn: () => {
      return fetchWeather(lat, lon);
    },
  });

  return query;
}
