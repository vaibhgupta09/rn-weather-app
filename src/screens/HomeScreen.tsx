import React, { JSX, useContext } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { useDispatch } from 'react-redux';
import BackgroundGrid from '../components/BackgroundGrid';
import Button from '../components/Button';
import WeatherCard from '../components/WeatherCard';
import { useWeather } from '../hooks/useWeather';
import { AppDispatch } from '../redux/store';
import styles from '../styles/homeScreenStyles';
import { ThemeContext } from '../styles/ThemeContext';

const HomeScreen = (): JSX.Element => {
  const { city, setCity, weatherData: data, loading, error, fetchWeather: handleFetch } = useWeather();

  const dispatch = useDispatch<AppDispatch>();
  const { theme, setTheme } = useContext(ThemeContext);

  // useEffect(()=>{
  //   dispatch(loadLastCity());
  // },[]);

  const handleSubmit = (): void => {
    handleFetch();
    Keyboard.dismiss();
  };
  const getWindDirection = (degrees: number): string => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };

  const isDark = theme === 'dark';
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      testID="home-screen-container"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          testID="home-screen-scroll-view"
        >
          <>
            {data ? (
              <BackgroundGrid icon={data.weather[0].icon}>
               <WeatherCard
          cityName={data.name}
          temperature={data.main.temp}
          condition={data.weather[0].main}
          iconCode={data.weather[0].icon}
          isDark={isDark}
          // Add new props
          description={data.weather[0].description}
          humidity={data.main.humidity}
          pressure={data.main.pressure}
          windSpeed={data.wind.speed}
          windDirection={getWindDirection(data.wind.deg)}
        />
              </BackgroundGrid>
            ) : <View style={styles.emptyView} testID="empty-view">
              {error ? <Text style={styles.error} testID="error-message">{error}😭☹️</Text>:<View testID="welcome-view">
                <Text style={styles.headingText} testID="app-title">Weather App</Text>
                <Text style={styles.bodyText} testID="app-description">Search your city weather on one click</Text>
                </View>}
            </View>}
            <View style={[styles.container, isDark && styles.darkContainer]} testID="input-container">
              <TextInput
                placeholder="Enter city"
                value={city}
                onChangeText={setCity}
                style={[styles.input, isDark && styles.darkInput]}
                placeholderTextColor={isDark ? '#ccc' : '#333'}
                returnKeyType="search"
                onSubmitEditing={handleSubmit}
                testID="city-input"
              />
              <Button
                title="Get Weather"
                onPress={handleSubmit}
                isDark={isDark}
                isLoading={loading}
                disabled={loading}
                testID="search-button"
              />

              <View style={styles.toggleContainer} testID="theme-toggle-container">
                <Text style={{ color: isDark ? '#fff' : '#000' }} testID="theme-label">Dark Mode</Text>
                <Switch
                  value={isDark}
                  onValueChange={() => setTheme(isDark ? 'light' : 'dark')}
                  testID="theme-switch"
                />
              </View>
            </View>
          </>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;