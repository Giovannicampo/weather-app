import { CurrentWeatherDTO, CurrentWeatherFilter, ForecastDTO, ForecastFilter, HistoryDTO, HistoryFilter } from "./dto";
import { WeatherServiceImpl } from "./serviceImpl";

export interface WeatherService {
    getCurrentWeather(request: CurrentWeatherFilter): Promise<CurrentWeatherDTO>;
    getForecast(request: ForecastFilter): Promise<ForecastDTO>;
    getHistory(request: HistoryFilter): Promise<HistoryDTO>;
}

// factory method for service implementation
export function NewWeatherService(): WeatherService {
    return new WeatherServiceImpl();
}