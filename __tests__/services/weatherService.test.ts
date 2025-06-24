import axios from 'axios';
import API_CONFIG from '../../src/config/api.config';
import { getWeatherByCity } from '../../src/services/weatherService';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Weather Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch weather data for a city', async () => {
        const mockWeatherData = {
            name: 'London',
            main: { temp: 20 },
            weather: [{ main: 'Clear', icon: '01d' }]
        };

        mockedAxios.get.mockResolvedValueOnce({ data: mockWeatherData });

        const result = await getWeatherByCity('London');

        expect(mockedAxios.get).toHaveBeenCalledWith(
            `${API_CONFIG.WEATHER_API_BASE_URL}/weather`,
            {
                params: {
                    q: 'London',
                    appid: API_CONFIG.WEATHER_API_KEY,
                    units: API_CONFIG.UNITS,
                },
            }
        );

        expect(result).toEqual(mockWeatherData);
    });

    it('should throw an error when the API call fails', async () => {
        const errorMessage = 'City not found';
        mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

        await expect(getWeatherByCity('InvalidCity')).rejects.toThrow(errorMessage);
        expect(mockedAxios.get).toHaveBeenCalled();
    });
});
