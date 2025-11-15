import React, { useEffect, useRef } from 'react';
import { StyleSheet, Animated, ViewStyle } from 'react-native';
import { theme } from '../theme';

interface SkeletonLoaderProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  style?: ViewStyle;
}

/**
 * Skeleton Loader Component
 *
 * Shows an animated placeholder while content is loading
 */
const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  width = '100%',
  height = 20,
  borderRadius = theme.borderRadius.sm,
  style,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => animation.stop();
  }, [animatedValue]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <Animated.View
      style={[
        styles.skeleton,
        style,
        {
          width: width as any,
          height: height as any,
          borderRadius,
          opacity,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: theme.colors.border.light,
  },
});

export default SkeletonLoader;
