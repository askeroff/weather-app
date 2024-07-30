import React from "react";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { renderWithQueryWrapper } from "./utils/test-utils";
import "@testing-library/jest-dom";

jest.mock("./consts");

import App from "./App";

test("renders App Component", async () => {
  renderWithQueryWrapper(<App />);

  const searchInput = screen.getByRole("combobox");

  fireEvent.change(searchInput, { target: { value: "New York" } });

  fireEvent.focus(searchInput);

  // find and select new york

  await waitFor(() => screen.getAllByRole("option"));

  const options = screen.getAllByRole("option");
  const option = options.find((item) => item.textContent?.includes("New York"));

  if (option) {
    fireEvent.click(option);
  }

  await waitFor(() => screen.getByTestId("weather"));

  const weather = screen.getByTestId("weather");

  expect(weather).toBeTruthy();

  const weatherTitle = screen.getByTestId("weather-title");

  expect(weatherTitle.textContent).toBe(
    "Current Weather in New York, United States of America"
  );

  // add tests to test favorites
  // tests to test metric checkbox
});
