import { ReactElement } from "react";
import { ForecastDay, Hour, Location } from "../../Weather/dto";
import Title, { Paragraph, SubTitle } from "../../utility/Title";
import "../../assets/css/customcurrent.css";
import "../../assets/css/customforecast.css";
import sunrise from "../../assets/pics/icons/sunrise.png";
import sunset from "../../assets/pics/icons/sunset.png";
import { getIcon } from "../../CustomCurrentWeather/CustomCurrentWeather";

interface HourProps {
  hour: Hour;
}

const HourBox = (props: HourProps): ReactElement => {
  const hour: Hour = props.hour;
  
  return (
    <div className="hour">
        <Paragraph className="textCenter small-p-size primary-color">
            {hour.time.split(" ")[1]}
        </Paragraph>
        <img src={getIcon(hour.condition.text)} alt="icon not found" />
        <Paragraph className="textCenter small-p-size primary-color">
            {`${hour.temp_c}°C`}
        </Paragraph>
    </div>
  );
};

interface DayProps {
  readonly forecastData: ForecastDay;
  readonly location: Location;
}

export const DayBox = (props: DayProps): ReactElement => {
  const { day, astro, hour, date } = props.forecastData; 
  const location = props.location;
  

  return (
    <div className="dayBox">
      <div className="dayInfo padding-r-10px padding-l-10px">
        <Title className="textLeft primary-color">{location.name}</Title>
        <Paragraph className="textLeft p-size primary-color padding-b-5px bikini-bottom">
          {`${location.region} ${location.country} ${date}`}
        </Paragraph>
        <Paragraph className="textLeft p-size primary-color bikini-bottom">
          {day.condition.text}
          <img src={day.condition.icon} className="img-size" />
          {`Max ${day.maxtemp_c}°C - Min ${day.mintemp_c}°C - Uv index ${day.uv}`}
        </Paragraph>

        <div className="astro">
          <div className="astro-item bikini-bottom right-on-border">
            <SubTitle className="textCenter primary-color">Sunrise</SubTitle>
            <img src={sunrise} alt="image not found" />
            <Paragraph className="textCenter p-size primary-color">
              {astro.sunrise}
            </Paragraph>
          </div>
          <div className="astro-item bikini-bottom">
            <SubTitle className="textCenter primary-color">Sunset</SubTitle>
            <img src={sunset} alt="image not found" />
            <Paragraph className="textCenter p-size primary-color">
              {astro.sunset}
            </Paragraph>
          </div>
        </div>

        <div className="hours-container bikini-bottom">
            {hour.filter((h,index) => index <= 11).map((h, index) => 
            <HourBox 
            key={index}
            hour={h}
            />)}
        </div>
        <div className="hours-container">
            {hour.filter((h,index) => index > 11).map((h, index) => 
            <HourBox 
            key={index}
            hour={h}
            />)}
        </div>
      </div>
      <div className="hours"></div>
    </div>
  );
};
