import "whatwg-fetch";

// Polyfill TextEncoder and TextDecoder if not available
if (typeof global.TextEncoder === "undefined") {
  const { TextEncoder, TextDecoder } = require("util");
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}

import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  http.get("https://wft-geo-db.p.rapidapi.com/v1/geo/cities", () => {
    return HttpResponse.json({
      data: [
        {
          city: "New York",
          name: "New York",
          countryCode: "US",
          latitude: 40.7128,
          longitude: -74.006,
        },
      ],
    });
  }),
  http.get("https://api.openweathermap.org/data/2.5/weather", () => {
    return HttpResponse.json({
      weather: [{ description: "clear sky" }],
      main: { temp_max: 30, temp_min: 20, humidity: 49 },
      wind: { speed: 5 },
    });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
