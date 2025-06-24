module.exports = {
    transformIgnorePatterns: [
      'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)'
    ],
    testEnvironment: 'jsdom',
    preset: 'react-native',
    collectCoverage: true,
    collectCoverageFrom: [
      'src/**/*.{js,jsx,ts,tsx}',
      '!src/**/*.d.ts',
      '!src/types/**/*',
      '!src/config/**/*',
      '!src/assets/**/*',
      '!**/node_modules/**'
    ],
    coverageReporters: ['text', 'lcov', 'html'],
    coverageDirectory: 'coverage'
  };