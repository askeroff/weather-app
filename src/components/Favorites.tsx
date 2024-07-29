import React from "react";

import Card from "@mui/material/Card";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { ListItem } from "@mui/material";
import Typography from "@mui/material/Typography";

import { CityState } from "../types";
import { useWeatherContext } from "./Weather/WeatherContext";

export default function Favorites() {
  const {
    favorites = [],
    removeCityFromFavorites,
    setCity,
  } = useWeatherContext();

  return (
    <Card sx={{ marginTop: "10px", padding: "20px" }} variant="outlined">
      <Typography variant="h5" gutterBottom>
        Favorites
      </Typography>
      <List aria-labelledby="nested-list-subheader">
        {favorites.map((item: CityState) => {
          return (
            <ListItem
              key={item.value}
              secondaryAction={
                <IconButton
                  onClick={() => {
                    removeCityFromFavorites(item);
                  }}
                  edge="end"
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemButton
                onClick={() => {
                  setCity(item);
                }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
}
