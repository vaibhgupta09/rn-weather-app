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

import store from '../../src/redux/store';

describe('Redux Store', () => {
  it('should have the correct initial state structure', () => {
    const state = store.getState();
    
    expect(state).toHaveProperty('weather');
    
    expect(state.weather).toHaveProperty('data');
    expect(state.weather).toHaveProperty('loading');
    expect(state.weather).toHaveProperty('error');
  });

});
