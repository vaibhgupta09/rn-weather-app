import { render } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';
import BackgroundGrid from '../../src/components/BackgroundGrid';

describe('BackgroundGrid Component', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <BackgroundGrid icon="01d">
        <Text>Test Content</Text>
      </BackgroundGrid>
    );

    expect(getByText('Test Content')).toBeTruthy();
  });

  it('applies different background based on icon', () => {
    const { getByTestId } = render(
      <BackgroundGrid icon="01n">
        <Text>Test</Text>
      </BackgroundGrid>
    );

    const background = getByTestId('background-container');
    expect(background.props.style).toBeTruthy();
  });
});
