import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  isDark?: boolean;
  testID?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  title, 
  onPress, 
  isLoading = false, 
  disabled = false,
  isDark = false,
  testID
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || isLoading}
      style={[
        styles.button,
        isDark && styles.darkButton,
        (disabled || isLoading) && styles.disabledButton
      ]}
      testID={testID}
    >
      {isLoading ? (
        <ActivityIndicator color="#fff" testID="button-loading-indicator" />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  darkButton: {
    backgroundColor: '#1976D2',
  },
  disabledButton: {
    backgroundColor: '#BDBDBD',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Button;