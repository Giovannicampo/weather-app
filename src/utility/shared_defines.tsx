import { ReactElement } from "react";
import Introduction from "../Introduction/Introduction";
import { createTheme } from "@mui/material";
import CurrentWeather from "../CurrentWeatherView/CurrentWeather";

export type PromiseStatus = "idle" | "loading" | "successfully" | "failed";

export enum CONTEXT {
  INTRO,
  CURRENT,
  FORECAST,
  HISTORY,
  SAVED,
}

export enum PATH {
  INTRO = "/",
  CURRENT = "/current",
  FORECAST = "/forecast",
  HISTORY = "/history",
  SAVED = ""
}

export const themePalette = createTheme({
  palette: {
    primary: {
      light: "#fefcf4",
      main: "#f7f5ec",
    },
    secondary: {
      light: "#ae3400",
      main: "#b33904",
    },
  },
});

export enum PALETTE {
  PRIMARY = "#f7f5ec",
  PRIMARYLIGHT = "#fefcf4",
  SECONDARY = "#b33904",
  SECONDARYLIGHT = "#ae3400",
  BLACK = "#000",
}
