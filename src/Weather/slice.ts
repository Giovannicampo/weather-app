import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PromiseStatus } from "../utility/shared_defines";
import {
  CurrentWeatherDTO,
  CurrentWeatherFilter,
  ForecastDTO,
  ForecastFilter,
  HistoryDTO,
  HistoryFilter,
} from "./dto";
import { NewWeatherService } from "./service";

interface WeatherState {
  currentWeatherResponse?: CurrentWeatherDTO;
  forecastResponse?: ForecastDTO;
  historyResponse?: HistoryDTO;
  currentWeatherStatus: PromiseStatus;
  forecastStatus: PromiseStatus;
  historyStatus: PromiseStatus;
  currentWeatherFilter: CurrentWeatherFilter;
  forecastFilter: ForecastFilter;
  historyFilter: HistoryFilter;
}

const initialState: WeatherState = {
  currentWeatherStatus: "idle",
  forecastStatus: "idle",
  historyStatus: "idle",
  currentWeatherFilter: {
    location: "Paris",
  },
  forecastFilter: {
    location: "London",
    days: 3,
  },
  historyFilter: {
    location: "Madrid",
    date: new Date().toISOString().split("T")[0],
  },
};

export const getCurrentWeatherByLocation = createAsyncThunk(
  "weather/currentWeatherByLocation",
  async (
    request: CurrentWeatherFilter,
    thunkApi
  ): Promise<CurrentWeatherDTO> => {
    const weatherService = NewWeatherService();

    return weatherService.getCurrentWeather(request);
  }
);

export const getForecastByLocation = createAsyncThunk(
  "weather/forecastByLocation",
  async (request: ForecastFilter, thunkApi): Promise<ForecastDTO> => {
    const weatherService = NewWeatherService();

    return weatherService.getForecast(request);
  }
);

export const getHistoryByLocation = createAsyncThunk(
  "weather/historyByLocation",
  async (request: HistoryFilter, thunkApi): Promise<HistoryDTO> => {
    const weatherService = NewWeatherService();

    return weatherService.getHistory(request);
  }
);

const weatherSlice = createSlice({
  name: "weather/slice",
  initialState,
  reducers: {
    setCurrentWeatherFilterLocation: (state, action) => {
      state.currentWeatherFilter.location = action.payload;
    },
    setForecastFilterLocation: (state, action) => {
      state.forecastFilter.location = action.payload;
    },
    setHistoryFilterLocation: (state, action) => {
      state.historyFilter.location = action.payload;
    },
    setForecastFilterDays: (state, action) => {
      state.forecastFilter.days = action.payload;
    },
    setHistoryFilterDate: (state, action) => {
      state.historyFilter.date = action.payload;
    },
    resetCurrentWeatherStatus: (state) => {
      state.currentWeatherStatus = 'idle';
    },
    resetForecastStatus: (state) => {
      state.forecastStatus = 'idle';
    },
    resetHistoryStatus: (state) => {
      state.historyStatus = 'idle';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getCurrentWeatherByLocation.pending, (state) => {
        state.currentWeatherStatus = "loading";
      })
      .addCase(getCurrentWeatherByLocation.fulfilled, (state, action) => {
        state.currentWeatherStatus = "successfully";
        state.currentWeatherResponse = action.payload;
      })
      .addCase(getCurrentWeatherByLocation.rejected, (state) => {
        state.currentWeatherStatus = "failed";
      })
      .addCase(getForecastByLocation.pending, (state) => {
        state.forecastStatus = "loading";
      })
      .addCase(getForecastByLocation.fulfilled, (state, action) => {
        state.forecastStatus = "successfully";
        state.forecastResponse = action.payload;
      })
      .addCase(getForecastByLocation.rejected, (state) => {
        state.forecastStatus = "failed";
      })
      .addCase(getHistoryByLocation.pending, (state) => {
        state.historyStatus = "loading";
      })
      .addCase(getHistoryByLocation.fulfilled, (state, action) => {
        state.historyStatus = "successfully";
        state.historyResponse = action.payload;
      })
      .addCase(getHistoryByLocation.rejected, (state) => {
        state.historyStatus = "failed";
      });
  },
});

export const {
    setCurrentWeatherFilterLocation,
    setForecastFilterLocation,
    setHistoryFilterLocation,
    setForecastFilterDays,
    setHistoryFilterDate,
    resetCurrentWeatherStatus,
    resetForecastStatus,
    resetHistoryStatus
} = weatherSlice.actions;

export default weatherSlice.reducer
