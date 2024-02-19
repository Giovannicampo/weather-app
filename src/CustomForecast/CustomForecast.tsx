import { Fragment, ReactElement, useState } from "react";
import {
  CurrentWeatherDTO,
  ForecastDTO,
  ForecastDay,
  Location,
} from "../Weather/dto";
import CustomCurrentWeather from "../CustomCurrentWeather/CustomCurrentWeather";
import "../assets/css/customforecast.css";
import "../assets/css/customcurrent.css";
import Title, { SubTitle, Paragraph } from "../utility/Title";
import { getIcon } from "../CustomCurrentWeather/CustomCurrentWeather";
import DayDialog from "./Dialog/DayDialog";

interface CustomProps {
  readonly forecastData: ForecastDTO;
}

interface ForecastDayProps {
  data: ForecastDay;
  location: Location;
  open: boolean;
  setOpenDialog: (flag: boolean) => void;
  setDialogData: (data: ForecastDay) => void;
}

const ForecastDayBox = (props: ForecastDayProps): ReactElement => {
  const { date, day } = props.data;
  const { open, setOpenDialog } = props;

  const handleOpenDialog = (): void => {
    setOpenDialog(true);
  };

  const handleCloseDialog = (): void => {
    setOpenDialog(false);
  };

  return (
    <Fragment>
      <div
        className="day right-on-border"
        onClick={() => {
          handleOpenDialog();
          props.setDialogData(props.data);
        }}
      >
        <img
          className="imageDay"
          src={getIcon(day.condition.text)}
          alt="icon not found"
        />
        <Paragraph className="textCenter p-size primary-color">
          {`${date}`}
        </Paragraph>
        <Paragraph className="textCenter p-size primary-color">
          {`MAX ${day.maxtemp_c}°C - MIN ${day.mintemp_c}°C`}
        </Paragraph>
        <Paragraph className="textCenter p-size primary-color">
          {`${day.condition.text}`}
        </Paragraph>
      </div>
    </Fragment>
  );
};

export default function CustomForecast(props: CustomProps): ReactElement {
  const { location, current, forecast } = props.forecastData;
  const forecastDays: ForecastDay[] = forecast.forecastday;
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogData, setDialogData] = useState(forecastDays[0]);

  const handleCloseDialog = (): void => {
    setOpenDialog(false);
  };

  return (
    <Fragment>
      <div className="customForecastComponent">
        <div className="currentBox bikini-bottom">
          <CustomCurrentWeather
            currentWeatherData={{ location, current }}
            maxWidth="800px"
            minWidth="800px"
          />
        </div>
        <div className="forecastDays">
          <SubTitle className="textLeft primary-color padding-b-5 dark-background bikini-bottom">
            Forecast
          </SubTitle>
          <div className="days-container">
            {forecastDays.map((d, index) => (
              <ForecastDayBox
                location={location}
                key={index}
                data={d}
                open={openDialog}
                setOpenDialog={setOpenDialog}
                setDialogData={setDialogData}
              />
            ))}
          </div>
        </div>
      </div>
      <DayDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        forecastData={dialogData}
        location={location}
      />
    </Fragment>
  );
}
