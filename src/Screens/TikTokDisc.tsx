import * as React from 'react';
import type {ScreenProps} from '@/@types/screens';
import {View, StyleSheet, Image} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

interface Props extends ScreenProps<RootStackParamList, 'TikTokDisc'> {}

const TikTokDisc: React.FunctionComponent<Props> = props => {
  const rotation = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: `${rotation.value}deg`,
        },
      ],
    };
  });

  React.useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {duration: 2000, easing: Easing.linear}),
      -1,
    );
  }, []);
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          {
            justifyContent: 'center',
            alignItems: 'center',
          },
          animatedStyles,
        ]}>
        <Image
          style={{
            width: 90,
            height: 90,
          }}
          source={{
            uri: 'https://res.cloudinary.com/sgarciacloud/image/upload/v1614217280/disc_knxnbm.png',
          }}
        />
        <Image
          style={{
            width: 40,
            height: 40,
            position: 'absolute',
          }}
          source={require('@/assets/images/heart.png')}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#40739e',
  },
});

export default TikTokDisc;
