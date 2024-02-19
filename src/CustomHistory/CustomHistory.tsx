import { HistoryDTO } from "../Weather/dto";
import Title, { SubTitle } from "../utility/Title";
import { Paragraph } from "../utility/Title";
import "../assets/css/customcurrent.css";
import CloudyIcon from "../assets/pics/icons/cloudy.png";
import SunnyIcon from "../assets/pics/icons/sun.png";
import RainyIcon from "../assets/pics/icons/rainy.png";

interface CustomProps {
  readonly historyData: HistoryDTO;
  readonly maxWidth: string;
  readonly minWidth: string;
}

export const getIcon = (condition: string): string => {
  return condition.includes("cloudy")
    ? CloudyIcon
    : condition.includes("Sunny")
    ? SunnyIcon
    : RainyIcon;
};

export default function CustomHistory(props: CustomProps) {
  const { location, forecast } = props.historyData;
  const forecastDay = forecast.forecastday[0];

  return (
    <div
      className="customWeatherComponent"
      style={{ maxWidth: props.maxWidth, minWidth: props.minWidth }}
    >
      <div className="left">
        <Title className="textLeft primary-color">{location.name}</Title>
        <Paragraph className="textLeft p-size primary-color padding-b-5px bikini-bottom">
          {`${location.region} ${location.country} ${forecastDay.date}`}
        </Paragraph>
        <SubTitle className="textLeft primary-color">
          {`${forecastDay.day.maxtemp_c}°C`}
        </SubTitle>
        <SubTitle className="textLeft primary-color bikini-bottom">
          {`${forecastDay.day.mintemp_c}°C`}
        </SubTitle>
        <Paragraph className="textLeft p-size primary-color">
          {`${forecastDay.day.condition.text}`}
          <img src={forecastDay.day.condition.icon} className="img-size"></img>
        </Paragraph>
        <Paragraph className="textLeft p-size primary-color">
          {`max wind speed ${forecastDay.day.maxwind_mph} mph`}
        </Paragraph>
        <Paragraph className="textLeft p-size primary-color padding-b-5px">
          {`UV index ${forecastDay.day.uv}`}
        </Paragraph>
      </div>
      <div className="right">
        <div>
          <img
            className="imageRight"
            src={getIcon(forecastDay.day.condition.text)}
            alt="icon not found"
          />
        </div>
      </div>
    </div>
  );
}
