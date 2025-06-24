# Weather App

A simple React Native weather application that fetches and displays weather data from OpenWeatherMap API. The app supports both iOS and Android platforms.

## Features

- Search for weather by city name
- Display current temperature, weather condition, and weather icon
- Error handling for city not found
- Persistent storage of last searched city
- Dark mode toggle

## Tech Stack

- React Native with Expo
- TypeScript for type safety
- Redux Toolkit for state management
- AsyncStorage for local data persistence
- Jest and React Native Testing Library for testing

## Project Structure
<pre lang="text">
weather-app/
├── assets/              # Static assets like images, fonts, etc.
├── components/          # Reusable UI components (e.g., buttons, cards)
├── constants/           # Application-wide constants (e.g., colors, sizes)
├── tests/               # Unit and integration test files

├── src/
│   ├── components/      # Screen-specific components
│   ├── redux/           # Redux store configuration, slices, and actions
│   ├── screens/         # All screen components (e.g., HomeScreen, DetailsScreen)
│   ├── services/        # API calls and external service handlers
│   ├── styles/          # Global and modular stylesheets
│   ├── types/           # TypeScript type definitions and interfaces
│   └── utils/           # Helper and utility functions
</pre>   



## Architecture Decisions

### State Management
I chose Redux Toolkit for state management because it provides a standardized way to write Redux logic with less boilerplate. The weather data, loading states, and error messages are all managed in a dedicated weather slice, keeping the components clean and focused on rendering.

### API Integration
API calls are centralized in a service layer (`weatherService.ts`), which abstracts the details of fetching data from the OpenWeatherMap API. This separation makes it easier to change the API provider or modify request logic without affecting the components.

### Styling Approach
Styles are separated into their own files and organized by component or screen. This approach avoids inline styles and makes the UI more maintainable. The app also supports a dark mode toggle using React Context for theme management.

### Data Persistence
AsyncStorage is used to store the last searched city, allowing the app to display relevant data when reopened. This implementation is handled in the Redux layer, keeping the persistence logic separate from the UI.

### Component Design
Components follow the Single Responsibility Principle, with each component focused on a specific task. For example, the WeatherCard component is solely responsible for displaying weather information, while the HomeScreen component manages user input and navigation.

## Setup Instructions

### Prerequisites
- Node.js (v14 or later)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (optional for development)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/weather-app.git
cd weather-app

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
