import { Fragment } from "react";
import { CurrentWeatherDTO } from "../Weather/dto";
import Title from "../utility/Title";
import { SubTitle } from "../utility/Title";
import { Paragraph } from "../utility/Title";
import { Typography } from "@mui/material";
import { PALETTE } from "../utility/shared_defines";
import "../assets/css/customcurrent.css";
import CloudyIcon from "../assets/pics/icons/cloudy.png";
import SunnyIcon from "../assets/pics/icons/sun.png";
import RainyIcon from "../assets/pics/icons/rainy.png";
import MistIcon from "../assets/pics/icons/mist.png";
import OVercastIcon from "../assets/pics/icons/overcast.png"

interface CustomProps {
  readonly currentWeatherData: CurrentWeatherDTO;
  readonly maxWidth: string;
  readonly minWidth: string;
}

export const getIcon = (condition: string): string => {
  return condition.includes("cloudy")
    ? CloudyIcon
    : condition.includes("Sunny")
    ? SunnyIcon
    : condition.includes("Mist")
    ? MistIcon
    : condition.includes("Overcast")
    ? OVercastIcon
    : RainyIcon;
};

export default function CustomCurrentWeather(props: CustomProps) {
  const { location, current } = props.currentWeatherData;

  return (
    <div
      className="customWeatherComponent"
      style={{ maxWidth: props.maxWidth, minWidth: props.minWidth }}
    >
      <div className="left">
        <Title className="textLeft primary-color">{location.name}</Title>
        <Paragraph className="textLeft p-size primary-color padding-b-5px bikini-bottom">
          {`${location.region} ${location.country} ${location.localtime}`}
        </Paragraph>
        <Title className="textLeft king-size padding-15px primary-color bikini-bottom">
          {`${current.temp_c}°C`}
        </Title>
        <Paragraph className="textLeft p-size primary-color">
          {`feelslike: ${current.feelslike_c}°C - ${current.condition.text}`}
          <img src={current.condition.icon} className="img-size"></img>
        </Paragraph>
        <Paragraph className="textLeft p-size primary-color">
          {`wind speed ${current.wind_mph} mph - direction ${current.wind_dir}`}
        </Paragraph>
        <Paragraph className="textLeft p-size primary-color padding-b-5px">
          {`UV index ${current.uv}`}
        </Paragraph>
      </div>
      <div className="right">
        <div>
          <img
            className="imageRight"
            src={getIcon(current.condition.text)}
            alt="icon not found"
          />
        </div>
      </div>
    </div>
  );
}
