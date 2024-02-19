import { Grid, Paper } from "@mui/material";
import { Fragment, ReactElement, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  getForecastByLocation,
  resetForecastStatus,
  setForecastFilterDays,
  setForecastFilterLocation,
} from "../Weather/slice";
import CustomForecast from "../CustomForecast/CustomForecast";
import CustomTextField from "../utility/CustomTextField";
import CustomSelector from "./CustomSelector";

export default function Forecast(): ReactElement {
  const dispatch = useAppDispatch();
  const weatherState = useAppSelector((state) => state.weather);

  useEffect(() => {
    dispatch(getForecastByLocation(weatherState.forecastFilter));
    if (weatherState.forecastStatus === "successfully") {
      dispatch(resetForecastStatus());
    }
  }, [weatherState.forecastFilter]);

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

  const handleChangeLocation = (event: HTMLInputElement): void => {
    dispatch(setForecastFilterLocation(event.value));
  };

  const handleOnSelectDay = (event: HTMLInputElement): void => {
    dispatch(setForecastFilterDays(event.value));
  };

  const selectableDays: number[] = [1, 2, 3, 4, 5, 6, 7];

  return (
    <Fragment>
      <Grid container spacing={6}>
        <Grid item xs={12} sx={{ marginTop: "50px" }}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            Keep up on the weather forecast of your favourite cities!
          </Paper>
          <Grid
            item
            xs={12}
            display={"flex"}
            justifyContent={"center"}
            sx={{ marginTop: "30px" }}
          >
            {customizedForecast()}
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              marginBottom: "30px"
            }}
          >
            <CustomTextField
              id="history_location"
              label="Insert city name, postcode or IP address"
              defaultValue=""
              handler={(e) => {
                handleChangeLocation(e.target as HTMLInputElement);
              }}
            />
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              marginBottom: "30px"
            }}
          >
            <CustomSelector
              days={selectableDays}
              handler={(e) => {
                handleOnSelectDay(e.target as HTMLInputElement);
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
}
