import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import Button from '../../src/components/Button';

describe('Button Component', () => {
  it('renders with title and calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button title="Test Button" onPress={onPressMock} />
    );

    const button = getByText('Test Button');
    fireEvent.press(button);

    expect(onPressMock).toHaveBeenCalled();
  });

  it('shows loading indicator when isLoading is true', () => {
    const { getByTestId } = render(
      <Button title="Loading" onPress={() => { }} isLoading={true} />
    );

    expect(getByTestId('button-loading-indicator')).toBeTruthy();
  });

  it('applies testID when provided', () => {
    const { getByTestId } = render(
      <Button title="Test Button" onPress={() => { }} testID="custom-button-id" />
    );

    expect(getByTestId('custom-button-id')).toBeTruthy();
  });
});