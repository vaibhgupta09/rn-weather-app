import React from 'react';

export const ThemeContext = React.createContext({
  theme: 'light',
  setTheme: (theme: 'light' | 'dark') => {},
});

export const ThemeProvider = ThemeContext.Provider;
