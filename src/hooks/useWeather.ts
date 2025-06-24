import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchWeather } from '../redux/weather/weatherSlice';

export const useWeather = () => {
  const [city, setCity] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.weather);

  const handleFetchWeather = () => {
    if (city.trim()) {
      dispatch(fetchWeather(city));
    }
  };

  return {
    city,
    setCity,
    weatherData: data,
    loading,
    error,
    fetchWeather: handleFetchWeather,
  };
};