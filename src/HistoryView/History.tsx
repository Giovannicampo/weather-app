import { Grid, Paper } from "@mui/material";
import { Fragment, ReactElement, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  getHistoryByLocation,
  resetHistoryStatus,
  setHistoryFilterDate,
  setHistoryFilterLocation,
} from "../Weather/slice";
import CustomHistory from "../CustomHistory/CustomHistory";
import CustomTextField from "../utility/CustomTextField";
import ErrorAlert from "./ErrorAlert";

export default function History(): ReactElement {
  const dispatch = useAppDispatch();
  const weatherState = useAppSelector((state) => state.weather);
  const [openAlert, setOpenAlert] = useState(false);  

  useEffect(() => {
    dispatch(getHistoryByLocation(weatherState.historyFilter));
    if (weatherState.historyStatus === "successfully") {
      dispatch(resetHistoryStatus());
    }
  }, [weatherState.historyFilter]);

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

  const handleChangeLocation = (event: HTMLInputElement): void => {
    dispatch(setHistoryFilterLocation(event.value));
  };

  const handleChangeDate = (event: HTMLInputElement): void => {
    const dateRegex =
    /\b\d{4}\-\d{2}\-\d{2}\b/g;
    if(event.value.match(dateRegex) === null) {
      setOpenAlert(true);
      return;
    }
    setOpenAlert(false);
    dispatch(setHistoryFilterDate(event.value));
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
            Take a look at the weather forecast of a selected city in the last
            three days!
          </Paper>
        </Grid>
        <Grid item xs={6}>
          {customizedHistory()}
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
              id="history_location"
              label="Insert city name, postcode or IP address"
              defaultValue=""
              handler={(e) => {
                handleChangeLocation(e.target as HTMLInputElement);
              }}
            />

            <CustomTextField
              id="history_location"
              label="YYYY-MM-DD within last 7 days"
              defaultValue=""
              handler={(e) => {
                handleChangeDate(e.target as HTMLInputElement);
              }}
            />

            <ErrorAlert open={openAlert} setOpen={setOpenAlert} />
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
}
