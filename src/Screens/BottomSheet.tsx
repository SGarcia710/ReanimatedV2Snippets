import * as React from 'react';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import type {ScreenProps} from '@/@types/screens';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {View, StyleSheet, Dimensions, Button, Text} from 'react-native';

const {height} = Dimensions.get('window');

interface Props extends ScreenProps<RootStackParamList, 'BottomSheet'> {}

const BottomSheet: React.FunctionComponent<Props> = props => {
  const top = useSharedValue(height);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context: {startingTop: number}) => {
      context.startingTop = top.value;
    },
    onActive: (event, context) => {
      top.value = context.startingTop + event.translationY;
    },
    onEnd: (event, context) => {
      if (top.value > height * 0.5) {
        top.value = withTiming(height);
      } else if (top.value < height * 0.2) {
        top.value = withTiming(height * 0.05);
      } else {
        top.value = withTiming(height * 0.3);
      }
    },
  });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      top: top.value,
    };
  });
  return (
    <>
      <View style={styles.container}>
        <Button
          color="white"
          onPress={() => {
            top.value = withTiming(height * 0.3);
          }}
          title="Open modal"
        />
      </View>

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            {
              position: 'absolute',
              backgroundColor: '#d1d8e0',
              bottom: 0,
              left: 0,
              right: 0,
              alignItems: 'center',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              padding: 20,
            },
            animatedStyles,
          ]}>
          <View
            style={{
              width: 50,
              height: 4,
              backgroundColor: '#212121',
              borderRadius: 4,
              marginBottom: 16,
            }}
          />
          <Text>Modal Content</Text>
        </Animated.View>
      </PanGestureHandler>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
    justifyContent: 'center',
  },
});

export default BottomSheet;
