import * as React from 'react';
import type {ScreenProps} from '@/@types/screens';
import {View, StyleSheet, Dimensions} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useHeaderHeight} from '@react-navigation/elements';
import {clamp} from 'react-native-redash';

const {width, height} = Dimensions.get('window');

interface Props extends ScreenProps<RootStackParamList, 'DragAndDrop'> {}

const DragAndDrop: React.FunctionComponent<Props> = props => {
  const headerHeight = useHeaderHeight();
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  // Limits
  const boundX = width - 80;
  const boundY = height - 80 - headerHeight;

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context: {offsetX: number; offsetY: number}) => {
      context.offsetX = translateX.value;
      context.offsetY = translateY.value;
    },
    onActive: (event, context) => {
      // We use clamp fromn redash to avoid drags outside the screen
      translateX.value = clamp(
        context.offsetX + event.translationX,
        -(boundX / 2),
        boundX / 2,
      );
      translateY.value = clamp(
        context.offsetY + event.translationY,
        -(boundY / 2),
        boundY / 2,
      );
    },
    onEnd: event => {
      // Return to origin
      translateX.value = withTiming(0);
      translateY.value = withTiming(0);
    },
  });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });
  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            {
              width: 80,
              height: 80,
              borderRadius: 80 / 2,
              backgroundColor: '#e84118',
            },
            animatedStyles,
          ]}
        />
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#7f8fa6',
  },
});

export default DragAndDrop;
