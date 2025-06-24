import { act, renderHook } from '@testing-library/react-hooks';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { useWeather } from '../../src/hooks/useWeather';
import { fetchWeather } from '../../src/redux/weather/weatherSlice';

jest.mock('../../src/redux/weather/weatherSlice', () => ({
  fetchWeather: jest.fn()
}));

const mockStore = configureStore([]);
describe('useWeather Hook', () => {
  let store: any;
  let wrapper: React.FC<{children: React.ReactNode}>;

  beforeEach(() => {
    jest.clearAllMocks();
        store = mockStore({
      weather: {
        data: null,
        loading: false,
        error: null
      }
    });
    
    wrapper = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    );
    
    (fetchWeather as jest.Mock).mockReturnValue(() => Promise.resolve());
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useWeather(), { wrapper });
    
    expect(result.current.city).toBe('');
    expect(result.current.weatherData).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should update city state when setCity is called', () => {
    const { result } = renderHook(() => useWeather(), { wrapper });
    
    act(() => {
      result.current.setCity('London');
    });
    
    expect(result.current.city).toBe('London');
  });

  it('should not dispatch fetchWeather when city is empty', () => {
    const { result } = renderHook(() => useWeather(), { wrapper });
    
    act(() => {
      result.current.fetchWeather();
    });
    
    expect(fetchWeather).not.toHaveBeenCalled();
  });
});
