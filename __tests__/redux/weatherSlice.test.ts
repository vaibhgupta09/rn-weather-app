import AsyncStorage from '@react-native-async-storage/async-storage';
import reducer, { fetchWeather, loadLastCity } from '../../src/redux/weather/weatherSlice';
import { getWeatherByCity } from '../../src/services/weatherService';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve(null)),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve(null)),
  clear: jest.fn(() => Promise.resolve(null)),
  getAllKeys: jest.fn(() => Promise.resolve([])),
  multiGet: jest.fn(() => Promise.resolve([])),
  multiSet: jest.fn(() => Promise.resolve(null)),
  multiRemove: jest.fn(() => Promise.resolve(null)),
}));

jest.mock('../../src/services/weatherService', () => ({
  getWeatherByCity: jest.fn(),
}));

describe('Weather Slice', () => {
  const initialState = {
    data: null,
    loading: false,
    error: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle fetchWeather.pending', () => {
    const action = { type: fetchWeather.pending.type };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle fetchWeather.fulfilled', () => {
    const mockWeatherData = {
      name: 'London',
      main: { temp: 20 },
      weather: [{ main: 'Clear', icon: '01d' }]
    };
    
    const action = { 
      type: fetchWeather.fulfilled.type, 
      payload: mockWeatherData 
    };
    
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.data).toEqual(mockWeatherData);
    expect(state.error).toBeNull();
  });

  it('should handle fetchWeather.rejected', () => {
    const action = { 
      type: fetchWeather.rejected.type, 
      payload: 'City not found' 
    };
    
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toEqual('City not found');
  });

  
  it('should create fetchWeather.rejected when fetching weather fails', async () => {
    const errorMessage = 'City not found';
    
    (getWeatherByCity as jest.Mock).mockRejectedValueOnce({
      response: {
        data: {
          message: errorMessage
        }
      }
    });
    
    const dispatch = jest.fn();
    
    await fetchWeather('InvalidCity')(dispatch, () => ({}), undefined);
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch.mock.calls[0][0].type).toBe(fetchWeather.pending.type);
    expect(dispatch.mock.calls[1][0].type).toBe(fetchWeather.rejected.type);
    expect(dispatch.mock.calls[1][0].payload).toBe(errorMessage);
  });

  it('should dispatch fetchWeather when lastCity exists in AsyncStorage', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce('London');
    
    const dispatch = jest.fn();
    
    await loadLastCity()(dispatch);
    
    expect(AsyncStorage.getItem).toHaveBeenCalledWith('lastCity');
    
    expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
  });


});
