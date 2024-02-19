import { Grid, Paper } from "@mui/material";
import { Fragment, ReactElement, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  getCurrentWeatherByLocation,
  resetCurrentWeatherStatus,
  setCurrentWeatherFilterLocation,
} from "../Weather/slice";
import CustomCurrentWeather from "../CustomCurrentWeather/CustomCurrentWeather";
import CustomTextField from "../utility/CustomTextField";

export default function CurrentWeather(): ReactElement {
  const dispatch = useAppDispatch();
  const weatherState = useAppSelector((state) => state.weather);

  useEffect(() => {
    dispatch(getCurrentWeatherByLocation(weatherState.currentWeatherFilter));
    if (weatherState.currentWeatherStatus === "successfully") {
      dispatch(resetCurrentWeatherStatus());
    }
  }, [weatherState.currentWeatherFilter]);

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

  const handleChange = (event: HTMLInputElement): void => {
    dispatch(setCurrentWeatherFilterLocation(event.value));
  };

  return (
    <Fragment>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            Take a look at current weather of your favorite cities!
          </Paper>
        </Grid>
        <Grid item xs={6}>
          {customizedCurrent()}
        </Grid>
        <Grid item xs={6}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <CustomTextField
              id="current"
              label="Insert city name, postcode or IP address"
              defaultValue=""
              handler={(e) => {
                handleChange(e.target as HTMLInputElement)
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
}
