import React from 'react';
import {StyleSheet, View} from 'react-native';

import Wave, {HEIGHT, MARGIN_WIDTH, MIN_LEDGE, Side, WIDTH} from './Wave';
import Button from './Button';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {snapPoint, useVector} from 'react-native-redash';

const PREV = WIDTH;
const NEXT = 0;

interface SliderProps {
  index: number;
  setIndex: (value: number) => void;
  children: JSX.Element;
  prev?: JSX.Element;
  next?: JSX.Element;
}

const Slider = ({
  index,
  children: current,
  prev,
  next,
  setIndex,
}: SliderProps) => {
  const hasPrev = !!prev;
  const hasNext = !!next;
  const activeSide = useSharedValue(Side.NONE);
  const isTransitioningLeft = useSharedValue(false);
  const isTransitioningRight = useSharedValue(false);
  const left = useVector(0, HEIGHT / 2);
  const right = useVector(0, HEIGHT / 2);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: ({x}) => {
      if (x < MARGIN_WIDTH) {
        activeSide.value = Side.LEFT;
      } else if (x > WIDTH - MARGIN_WIDTH) {
        activeSide.value = Side.RIGHT;
      } else {
        activeSide.value = Side.NONE;
      }
    },
    onActive: ({x, y}) => {
      if (activeSide.value === Side.LEFT) {
        left.x.value = x;
        left.y.value = y;
      } else if (activeSide.value === Side.RIGHT) {
        right.x.value = WIDTH - x;
        right.y.value = y;
      }
    },
    onEnd: ({x, velocityX, velocityY}) => {
      if (activeSide.value === Side.LEFT) {
        const snapPoints = [MIN_LEDGE, WIDTH];
        const destination = snapPoint(x, velocityX, snapPoints);
        isTransitioningLeft.value = destination === WIDTH;
        left.y.value = withSpring(HEIGHT / 2, {velocity: velocityY});
        left.x.value = withSpring(
          destination,
          {
            velocity: velocityX,
            overshootClamping: isTransitioningLeft.value ? true : false,
            restSpeedThreshold: isTransitioningLeft.value ? 100 : 0.01,
            restDisplacementThreshold: isTransitioningLeft.value ? 100 : 0.01,
          },
          () => {
            if (isTransitioningLeft.value) {
              runOnJS(setIndex)(index - 1);
            }
          },
        );
      } else if (activeSide.value === Side.RIGHT) {
        const snapPoints = [WIDTH - MIN_LEDGE, 0];
        const destination = snapPoint(x, velocityX, snapPoints);
        isTransitioningRight.value = destination === 0;
        right.y.value = withSpring(HEIGHT / 2, {velocity: velocityY});
        right.x.value = withSpring(
          WIDTH - destination,
          {
            velocity: velocityX,
            overshootClamping: isTransitioningRight.value ? true : false,
            restSpeedThreshold: isTransitioningRight.value ? 100 : 0.01,
            restDisplacementThreshold: isTransitioningRight.value ? 100 : 0.01,
          },
          () => {
            if (isTransitioningRight.value) {
              runOnJS(setIndex)(index + 1);
            }
          },
        );
      }
    },
  });

  React.useEffect(() => {
    left.x.value = withSpring(MIN_LEDGE);
    right.x.value = withSpring(MIN_LEDGE);
  }, [left.x, right.x]);
  const leftStyle = useAnimatedStyle(() => ({
    zIndex: activeSide.value === Side.LEFT ? 100 : 0,
  }));
  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={StyleSheet.absoluteFill}>
        {current}
        {prev && (
          <Animated.View style={[StyleSheet.absoluteFill, leftStyle]}>
            <Wave
              side={Side.LEFT}
              position={left}
              isTransitioning={isTransitioningLeft}>
              {prev}
            </Wave>
          </Animated.View>
        )}
        {next && (
          <View style={StyleSheet.absoluteFill}>
            <Wave
              side={Side.RIGHT}
              position={right}
              isTransitioning={isTransitioningRight}>
              {next}
            </Wave>
          </View>
        )}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Slider;
