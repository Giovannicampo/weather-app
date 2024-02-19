import { Grid, Paper } from "@mui/material";
import { Fragment, ReactElement, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  getCurrentWeatherByLocation,
  getForecastByLocation,
  resetCurrentWeatherStatus,
  resetForecastStatus,
  setCurrentWeatherFilterLocation,
  setForecastFilterDays,
  setForecastFilterLocation,
  setHistoryFilterDate,
  setHistoryFilterLocation,
  getHistoryByLocation,
  resetHistoryStatus,
} from "../Weather/slice";
import CustomCurrentWeather from "../CustomCurrentWeather/CustomCurrentWeather";
import CustomForecast from "../CustomForecast/CustomForecast";
import CustomHistory from "../CustomHistory/CustomHistory";

export default function Introduction(): ReactElement {
  const dispatch = useAppDispatch();
  const weatherState = useAppSelector((state) => state.weather);

  if(weatherState.currentWeatherFilter.location === "") {
    dispatch(setCurrentWeatherFilterLocation("Paris"));
  }

  if(weatherState.forecastFilter.location === "") {
    dispatch(setForecastFilterDays("London"));
  }

  if(weatherState.historyFilter.location === "") {
    dispatch(setCurrentWeatherFilterLocation("Madrid"));
  }

  useEffect(() => {
    dispatch(getCurrentWeatherByLocation(weatherState.currentWeatherFilter));
    if (weatherState.currentWeatherStatus === "successfully") {
      dispatch(resetCurrentWeatherStatus());
    }
  }, [weatherState.currentWeatherFilter]);

  useEffect(() => {
    dispatch(getForecastByLocation(weatherState.forecastFilter));
    if (weatherState.forecastStatus === "successfully") {
      dispatch(resetForecastStatus());
    }
  }, [weatherState.forecastFilter]);

  useEffect(() => {
    dispatch(getHistoryByLocation(weatherState.historyFilter));
    if (weatherState.historyStatus === "successfully") {
      dispatch(resetHistoryStatus());
    }
  }, [weatherState.historyFilter]);

  const customizedCurrent = (): ReactElement => {
    if (
      weatherState.currentWeatherStatus === "successfully" &&
      weatherState.currentWeatherResponse !== undefined &&
      weatherState.currentWeatherResponse.current !== undefined &&
      weatherState.currentWeatherResponse.location !== undefined
    ) {
      const data = weatherState.currentWeatherResponse;
      return (
        <CustomCurrentWeather
          currentWeatherData={data}
          maxWidth="420px"
          minWidth="270px"
        />
      );
    }
    return <></>;
  };

  const customizedForecast = (): ReactElement => {
    if (
      weatherState.forecastStatus === "successfully" &&
      weatherState.currentWeatherResponse !== undefined &&
      weatherState.forecastResponse?.current !== undefined &&
      weatherState.forecastResponse.location !== undefined &&
      weatherState.forecastResponse.forecast !== undefined
    ) {
      const data = weatherState.forecastResponse;
      return <CustomForecast forecastData={data} />;
    }
    return <></>;
  };

  const customizedHistory = (): ReactElement => {
    if (
      weatherState.historyStatus === "successfully" &&
      weatherState.historyResponse !== undefined &&
      weatherState.historyResponse.forecast !== undefined &&
      weatherState.historyResponse.location !== undefined
    ) {
      const data = weatherState.historyResponse;
      return (
        <CustomHistory historyData={data} maxWidth="420px" minWidth="270px" />
      );
    }
    return <></>;
  };

  return (
    <Fragment>
      <Grid container spacing={6}>
        <Grid item xs={6}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            Weather.IO makes it simple to view current weather of any location
            you are looking for. Over than a user-friendly description of the
            weather condition, the following panel shows current temperature,
            feels-like temperature, wind speed in mph and direction and UV
            Index.
          </Paper>
        </Grid>
        <Grid item xs={6}>
          {customizedCurrent()}
        </Grid>
        <Grid item xs={12} sx={{ marginTop: "50px" }}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            The application provides weather forecast for any place you'd like
            to view and shows, in a linked dialog, weather conditions per hour.
          </Paper>
        </Grid>

        <Grid
          item
          xs={12}
          display={"flex"}
          justifyContent={"center"}
        >
          {customizedForecast()}
        </Grid>

        <Grid item xs={6} sx={{ marginTop: "50px" }}>
          {customizedHistory()}
        </Grid>
        <Grid item xs={6} sx={{ marginTop: "50px" }}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            The application provides an history forecast component for viewing
            weather diagnostics in the past.
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
}
