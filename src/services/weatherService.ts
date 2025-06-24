import axios from 'axios';
import API_CONFIG from '../config/api.config';
import { WeatherData } from '../types';

export const getWeatherByCity = async (city: string): Promise<WeatherData> => {
  const response = await axios.get(
    `${API_CONFIG.WEATHER_API_BASE_URL}/weather`,
    {
      params: {
        q: city,
        appid: API_CONFIG.WEATHER_API_KEY,
        units: API_CONFIG.UNITS,
      },
    }
  );
  
  return response.data;
};