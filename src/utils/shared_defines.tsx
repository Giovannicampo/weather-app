import { ReactElement } from "react";
import Main from "../Introduction/Introduction";
import { createTheme } from "@mui/material";

export enum CONTEXT {
  INTRO,
  CURRENT,
  FORECAST,
  HISTORY,
  SAVED
}

export const getContext = (context: CONTEXT): ReactElement => {
  switch (context) {
    case CONTEXT.INTRO:
      return <Main />;
  }
  return <Main />;
};

export const themePalette = createTheme({
  palette: {
    primary: {
      light:"#fefcf4",
      main: "#f7f5ec",
    },
    secondary: {
      main: "#b33904",
    },
  },
});
