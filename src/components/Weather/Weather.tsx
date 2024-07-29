import React from "react";

import { Card } from "@mui/material";
import { useWeather } from "../../hooks/useGeo";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useWeatherContext } from "./WeatherContext";

export default function Weather() {
  const { addCityToFavorites, city } = useWeatherContext();

  const [lat, lon] = city ? city.value.split(" ") : ["", ""];

  const { data, isLoading } = useWeather(lat, lon);

  const handleOnAdd = () => {
    if (city) {
      addCityToFavorites(city);
    }
  };

  if (isLoading || data == undefined) {
    return <div>...loading</div>;
  }

  return (
    <Card
      data-testid="weather"
      sx={{ marginTop: "10px", p: "20px" }}
      variant="outlined"
    >
      <Typography variant="h5" gutterBottom>
        Current Weather in {city?.label}
      </Typography>
      <div className="weather-summary">
        <div>
          <Typography
            sx={{ paddingRight: "4px" }}
            variant="button"
            display="inline-block"
            gutterBottom
          >
            Overall:
          </Typography>
          <Typography variant="body2" display="inline-block" gutterBottom>
            {data.weather[0].description}
          </Typography>
        </div>
        <div>
          <Typography
            sx={{ paddingRight: "4px" }}
            variant="button"
            display="inline-block"
            gutterBottom
          >
            Max Temp:
          </Typography>
          <Typography variant="body2" display="inline-block" gutterBottom>
            {data.main.temp_max} &deg;
          </Typography>
        </div>

        <div>
          <Typography
            sx={{ paddingRight: "4px" }}
            variant="button"
            display="inline-block"
            gutterBottom
          >
            Min Temp:
          </Typography>
          <Typography variant="body2" display="inline-block" gutterBottom>
            {data.main.temp_min} &deg;
          </Typography>
        </div>

        <div>
          <Typography
            sx={{ paddingRight: "4px" }}
            variant="button"
            display="inline-block"
            gutterBottom
          >
            Wind speed:
          </Typography>
          <Typography variant="body2" display="inline-block" gutterBottom>
            {data.wind.speed} m/s
          </Typography>
        </div>

        <div>
          <Typography
            sx={{ paddingRight: "4px" }}
            variant="button"
            display="inline-block"
            gutterBottom
          >
            Humidity:
          </Typography>
          <Typography variant="body2" display="inline-block" gutterBottom>
            {data.main.humidity} %
          </Typography>
        </div>
      </div>

      <Button onClick={handleOnAdd} variant="contained">
        Add this location to favorites
      </Button>
    </Card>
  );
}
