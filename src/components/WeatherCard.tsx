import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface WeatherCardProps {
  cityName: string;
  temperature: number;
  condition: string;
  iconCode: string;
  isDark?: boolean;
  humidity?: number;
  pressure?: number;
  windSpeed?: number;
  windDirection?: string;
  description?: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  cityName,
  temperature,
  condition,
  iconCode,
  isDark = false,
  humidity,
  pressure,
  windSpeed,
  windDirection,
  description,
}) => {
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  const roundedTemp = Math.round(temperature);
  
  return (
    <View 
      style={[styles.container, isDark ? styles.darkContainer : styles.lightContainer]} 
      testID="weather-card-container"
    >
      <Text style={[styles.cityName, isDark ? styles.darkText : styles.lightText]}>
        {cityName}
      </Text>
      <View style={styles.weatherInfo}>
        <Text style={[styles.temperature, isDark ? styles.darkText : styles.lightText]}>
          {roundedTemp}°C
        </Text>
      </View>
      <Image 
          source={{ uri: iconUrl }} 
          style={styles.weatherIcon} 
          testID="weather-icon"
        />
      <Text style={[styles.condition, isDark ? styles.darkText : styles.lightText]}>
        {description}
      </Text>
      <View style={styles.detailsContainer}>
        {humidity !== undefined && (
          <Text style={[styles.detailText, isDark ? styles.darkText : styles.lightText]}>
            Humidity: {humidity}%
          </Text>
        )}
        
        {windSpeed !== undefined && (
          <Text style={[styles.detailText, isDark ? styles.darkText : styles.lightText]}>
            Wind: {windSpeed} m/s {windDirection || ''}
          </Text>
        )}
        
        {pressure !== undefined && (
          <Text style={[styles.detailText, isDark ? styles.darkText : styles.lightText]}>
            Pressure: {pressure} hPa
          </Text>
        )}
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    margin: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  lightContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  darkContainer: {
    backgroundColor: 'rgba(50, 50, 50, 0.8)',
  },
  cityName: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  weatherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherIcon: {
    width: 72,
    height: 60,
  },
  temperature: {
    fontSize: 60,
    fontWeight:'500'
  },
  condition: {
    fontSize: 18,
  },
  lightText: {
    color: '#333',
  },
  darkText: {
    color: '#fff',
  },
  detailsContainer: {
    width: '100%',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ea6e49',
  },
  detailText: {
    fontSize: 16,
    marginVertical: 4,
  },

});

export default WeatherCard;