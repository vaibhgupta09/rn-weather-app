import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { Provider } from 'react-redux';
import { loadLastCity } from '../../src/redux/weather/weatherSlice';
import HomeScreen from '../../src/screens/HomeScreen';
import { ThemeContext } from '../../src/styles/ThemeContext';

jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(() => Promise.resolve(null)),
    setItem: jest.fn(() => Promise.resolve(null))
}));

jest.mock('../../src/redux/weather/weatherSlice', () => ({
    fetchWeather: jest.fn(),
    loadLastCity: jest.fn()
}));

const mockFetchWeather = jest.fn();

jest.mock('../../src/hooks/useWeather', () => ({
    useWeather: () => ({
        city: 'London',
        setCity: jest.fn(),
        weatherData: null,
        loading: false,
        error: null,
        fetchWeather: mockFetchWeather
    })
}));

jest.mock('../../src/redux/store', () => {
    return {
        __esModule: true,
        default: {
            getState: () => ({
                weather: {
                    data: null,
                    loading: false,
                    error: null
                }
            }),
            dispatch: jest.fn(),
            subscribe: jest.fn(),
            replaceReducer: jest.fn()
        }
    };
});

import store from '../../src/redux/store';

describe('HomeScreen Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly with initial state', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <ThemeContext.Provider value={{ theme: 'light', setTheme: jest.fn() }}>
                    <HomeScreen />
                </ThemeContext.Provider>
            </Provider>
        );

        expect(getByTestId('home-screen-container')).toBeTruthy();

        expect(getByTestId('welcome-view')).toBeTruthy();

        expect(getByTestId('app-title')).toBeTruthy();

        expect(getByTestId('input-container')).toBeTruthy();

        expect(getByTestId('city-input')).toBeTruthy();

        expect(loadLastCity).toHaveBeenCalled();
    });

    it('handles city input and search button press', () => {
        const { getByText, getByTestId } = render(
            <Provider store={store}>
                <ThemeContext.Provider value={{ theme: 'light', setTheme: jest.fn() }}>
                    <HomeScreen />
                </ThemeContext.Provider>
            </Provider>
        );

        const cityInput = getByTestId('city-input');

        fireEvent.changeText(cityInput, 'New York');

        const searchButton = getByText('Get Weather');

        fireEvent.press(searchButton);

        expect(mockFetchWeather).toHaveBeenCalled();
    });

    it('displays error message when there is an error', () => {
        jest.spyOn(require('../../src/hooks/useWeather'), 'useWeather').mockReturnValue({
            city: 'London',
            setCity: jest.fn(),
            weatherData: null,
            loading: false,
            error: 'City not found',
            fetchWeather: jest.fn()
        });

        const { getByTestId } = render(
            <Provider store={store}>
                <ThemeContext.Provider value={{ theme: 'light', setTheme: jest.fn() }}>
                    <HomeScreen />
                </ThemeContext.Provider>
            </Provider>
        );

        expect(getByTestId('error-message')).toBeTruthy();
    });

    it('toggles theme when switch is pressed', () => {
        const setThemeMock = jest.fn();

        const { getByTestId } = render(
            <Provider store={store}>
                <ThemeContext.Provider value={{ theme: 'light', setTheme: setThemeMock }}>
                    <HomeScreen />
                </ThemeContext.Provider>
            </Provider>
        );

        const themeSwitch = getByTestId('theme-switch');

        fireEvent(themeSwitch, 'onValueChange', true);

        expect(setThemeMock).toHaveBeenCalledWith('dark');
    });
});