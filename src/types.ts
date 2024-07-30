export interface CityState {
  value: string;
  label: string;
}

export interface CityGeo {
  city: string;
  name: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
}

export interface WeatherResponse {
  main: {
    temp_max: number;
    temp_min: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  weather: Array<{
    description: string;
  }>;
}
