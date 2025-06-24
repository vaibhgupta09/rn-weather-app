import { render } from '@testing-library/react-native';
import React from 'react';
import WeatherCard from '../../src/components/WeatherCard';

describe('WeatherCard Component', () => {
  const defaultProps = {
    cityName: 'London',
    temperature: 15.5,
    condition: 'Cloudy',
    iconCode: '04d',
    isDark: false
  };

  it('renders all weather information correctly', () => {
    const { getByText, getByTestId } = render(<WeatherCard {...defaultProps} />);
    expect(getByText('London')).toBeTruthy();
    expect(getByText('16°')).toBeTruthy();
    expect(getByText('Cloudy')).toBeTruthy();
    const weatherIcon = getByTestId('weather-icon');
    expect(weatherIcon.props.source.uri).toContain('04d');
  });

});

const styles = {
  darkContainer: {
    backgroundColor: 'rgba(50, 50, 50, 0.8)',
  }
};