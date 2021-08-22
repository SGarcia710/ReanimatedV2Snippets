import * as React from 'react';
import type {ScreenProps} from '@/@types/screens';
import {View, StyleSheet, Image} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

interface Props extends ScreenProps<RootStackParamList, 'ScrollEvents'> {}

const ScrollEvents: React.FunctionComponent<Props> = props => {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        scrollY.value,
        [-50, 0, 50],
        ['#ED4C67', '#6F1E51', '#5758BB'],
      ),
    };
  });

  return (
    <Animated.ScrollView
      style={[styles.container, animatedStyles]}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      contentContainerStyle={{
        height: '100%',
        width: '100%',
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={{
            uri: 'https://image.flaticon.com/icons/png/512/4568/4568821.png',
          }}
          style={[
            {
              width: 200,
              height: 200,
            },
          ]}
        />
      </View>
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ScrollEvents;
