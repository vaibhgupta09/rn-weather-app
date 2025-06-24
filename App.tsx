import { NavigationContainer } from '@react-navigation/native';
import React, { JSX, useEffect, useState } from 'react';
import { Appearance } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import HomeScreen from './src/screens/HomeScreen';
import { ThemeProvider } from './src/styles/ThemeContext';

const App = (): JSX.Element => {
  const [theme, setTheme] = useState<'light' | 'dark'>(Appearance.getColorScheme() || 'light');

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (colorScheme) {
        setTheme(colorScheme);
      }
    });

    return () => subscription.remove();
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider value={{ theme, setTheme }}>
        <NavigationContainer>
          <HomeScreen />
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
};

export default App;