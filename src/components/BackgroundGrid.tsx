import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Easing, Image, StyleSheet, View } from 'react-native';

const { width } = Dimensions.get('window');

interface BackgroundGridProps {
  icon: string;
  children?: React.ReactNode;
}

const BackgroundGrid = ({ icon, children }: BackgroundGridProps) => {
  const rows = Array.from({ length: 10 });
  const imageUri = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  const scrollAnim = useRef(rows.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    scrollAnim.forEach((anim, index) => {
      Animated.loop(
        Animated.timing(anim, {
          toValue: -width,
          duration: 15000 + index * 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    });
  }, [scrollAnim]);

  return (
    <View style={styles.container} pointerEvents="none" testID="background-container">
      {rows.map((_, rowIdx) => (
        <View key={`row-${rowIdx}`} style={styles.rowWrapper} testID={`row-${rowIdx}`}>
          <Animated.View
            style={{
              flexDirection: 'row',
              transform: [{ translateX: scrollAnim[rowIdx] }],
            }}
            testID={`animated-row-${rowIdx}`}
          >
            {[...Array(40)].map((_, colIdx) => (
              <Image
                key={`col-${colIdx}`}
                source={{ uri: imageUri }}
                style={styles.image}
                resizeMode="contain"
                testID={`weather-icon-${rowIdx}-${colIdx}`}
              />
            ))}
          </Animated.View>
        </View>
      ))}
      {children && (
        <View style={styles.childrenContainer} pointerEvents="auto" testID="children-container">
          {children}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        position: 'relative',
    },
    rowWrapper: {
      overflow: 'hidden',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    image: {
      width: 75,
      height: 54,
      resizeMode: 'contain',
      opacity: 0.5, 
    },
    childrenContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
    },
});

export default BackgroundGrid;