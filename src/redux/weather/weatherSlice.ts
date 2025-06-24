import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getWeatherByCity } from '../../services/weatherService';
import { WeatherData } from '../../types';

interface WeatherState {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchWeather = createAsyncThunk<WeatherData, string, { rejectValue: string }>(
    'weather/fetch',
    async (city, thunkAPI) => {
      try {
        const data = await getWeatherByCity(city);
        await AsyncStorage.setItem('lastCity', city);
        return data;
      } catch (e: any) {
        const message =
          e?.response?.data?.message || 'Unable to fetch weather';
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
  

export const loadLastCity = () => async (dispatch: any) => {
  const lastCity = await AsyncStorage.getItem('lastCity');
  if (lastCity) dispatch(fetchWeather(lastCity));
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
      });
  },
});

export default weatherSlice.reducer;