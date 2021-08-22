import * as React from 'react';
import type {ScreenProps} from '@/@types/screens';
import {View, StyleSheet} from 'react-native';

interface Props extends ScreenProps<RootStackParamList, 'LiquidSwipe'> {}

const LiquidSwipe: React.FunctionComponent<Props> = props => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LiquidSwipe;
