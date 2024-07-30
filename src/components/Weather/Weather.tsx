import React, { CSSProperties, useState } from "react";

import { Card } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import HashLoader from "react-spinners/HashLoader";

import Checkbox from "@mui/material/Checkbox";

import { useWeatherContext } from "./WeatherContext";
import useWeather from "../../hooks/useWeather";
import { toggleMetric } from "../../utils/helpers";

const override: CSSProperties = {
  display: "block",
  margin: "20px auto 0",
  borderColor: "red",
};

export default function Weather() {
  const { addCityToFavorites, city } = useWeatherContext();

  const [metric, setMetric] = useState(true);

  const [lat, lon] = city ? city.value.split(" ") : ["", ""];

  const { data, isLoading } = useWeather(lat, lon);

  if (!city) {
    throw new Error("This component should be rendered only when city is set");
  }

  const handleOnAdd = () => {
    addCityToFavorites(city);
  };

  const handleOnChange = () => {
    setMetric(!metric);
  };

  if (isLoading || data == undefined) {
    return (
      <HashLoader
        color="green"
        loading={isLoading}
        cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  }

  const formattedData = toggleMetric(data, metric);

  return (
    <Card
      data-testid="weather"
      sx={{ marginTop: "10px", p: "20px" }}
      variant="outlined"
    >
      <Typography variant="h5" gutterBottom data-testid="weather-title">
        Current Weather in {city.label}
      </Typography>

      <FormControlLabel
        control={<Checkbox onChange={handleOnChange} checked={metric} />}
        label="Metric"
      />

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
            {formattedData.main.temp_max}{" "}
            {metric ? <span>&#8451;</span> : <span>&#8457;</span>}
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
            {formattedData.main.temp_min}{" "}
            {metric ? <span>&#8451;</span> : <span>&#8457;</span>}
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
