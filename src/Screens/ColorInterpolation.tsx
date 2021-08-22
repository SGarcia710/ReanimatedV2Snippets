import * as React from 'react';
import type {ScreenProps} from '@/@types/screens';
import {View, StyleSheet, Text, useWindowDimensions} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {useHeaderHeight} from '@react-navigation/elements';

const COLORS = [
  '#63cdda',
  '#778beb',
  '#786fa6',
  '#cf6a87',
  '#ea8685',
  '#f3a683',
  '#f8a5c2',
  '#f7d794',
];

interface Props extends ScreenProps<RootStackParamList, 'ColorInterpolation'> {}

const ColorInterpolation: React.FunctionComponent<Props> = props => {
  const {height} = useWindowDimensions();
  const headerHeight = useHeaderHeight();

  const scrollY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
    console.log(scrollY.value);
  });

  const animatedBackground = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        scrollY.value,
        COLORS.map((_, index) => index * (height - headerHeight)),
        COLORS,
      ),
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          {
            ...StyleSheet.absoluteFillObject,
          },
          animatedBackground,
        ]}
      />
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        pagingEnabled
        onScroll={onScroll}
        scrollEventThrottle={16}>
        {React.Children.toArray(
          COLORS.map(color => (
            <View
              style={{
                height: height - headerHeight,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>Hi I'm {color}</Text>
            </View>
          )),
        )}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ColorInterpolation;
