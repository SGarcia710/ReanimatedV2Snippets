import React from 'react';
import {Image, StyleSheet, Dimensions, ImageSourcePropType} from 'react-native';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';

const {width} = Dimensions.get('window');

const ORIGIN = -(width / 3 + 30);

interface CardProps {
  image: ImageSourcePropType;
  isRotated: Animated.SharedValue<number>;
  index: number;
}

const Card = ({image, isRotated, index}: CardProps) => {
  const animatedStyles = useAnimatedStyle(() => {
    const rotate = interpolate(
      isRotated.value,
      [0, 1],
      [0, ((index - 1) * Math.PI) / 6],
    );

    return {
      transform: [{translateY: -ORIGIN}, {rotate}, {translateY: ORIGIN}],
    };
  });
  return (
    <Animated.View style={[styles.container, animatedStyles]}>
      <Image style={styles.image} source={image} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 350,
    aspectRatio: 1256 / 1838,
  },
});

export default Card;
