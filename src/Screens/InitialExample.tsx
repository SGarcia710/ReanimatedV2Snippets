import * as React from 'react';
import type {ScreenProps} from '@/@types/screens';
import {View, StyleSheet} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

interface Props extends ScreenProps<RootStackParamList, 'InitialExample'> {}

const InitialExample: React.FunctionComponent<Props> = props => {
  const scale = useSharedValue(0);

  React.useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1, {
          duration: 1000,
        }),
        withTiming(0, {
          duration: 1000,
        }),
      ),
      -1,
    );
  }, []);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(scale.value, [0, 1], [0.5, 1]),
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={{
          uri: 'https://image.flaticon.com/icons/png/512/4568/4568812.png',
        }}
        style={[
          {
            width: 200,
            height: 200,
          },
          animatedStyles,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5758BB',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default InitialExample;
