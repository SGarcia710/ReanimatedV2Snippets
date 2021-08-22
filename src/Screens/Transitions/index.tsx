import * as React from 'react';
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import type {ScreenProps} from '@/@types/screens';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Card from './Card';

const CARDS = [
  require('@/assets/images/Card2.png'),
  require('@/assets/images/Card3.png'),
  require('@/assets/images/Card4.png'),
];
interface Props extends ScreenProps<RootStackParamList, 'Transitions'> {}

const Transitions: React.FunctionComponent<Props> = props => {
  const [isRotated, setIsRotated] = React.useState(false);
  const isRotatedAnimated = useSharedValue(false);

  React.useEffect(() => {
    isRotatedAnimated.value = isRotated;
  }, [isRotated, isRotatedAnimated]);

  const isRotatedTransition = useDerivedValue(() => {
    return withTiming(isRotatedAnimated.value);
  });
  return (
    <View style={styles.container}>
      {React.Children.toArray(
        CARDS.map((card, index) => (
          <Card image={card} index={index} isRotated={isRotatedTransition} />
        )),
      )}

      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 150,
          backgroundColor: 'white',
          paddingHorizontal: 22,
          paddingVertical: 14,
          borderRadius: 8,
        }}
        onPress={() => setIsRotated(!isRotated)}>
        <Text>{isRotated ? 'Centrar' : 'Rotar'}</Text>
      </TouchableOpacity>
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

export default Transitions;
