import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface DummyScreenProps {
  text: string;
}

const DummyScreen = ({text}: DummyScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>{text}</Text>
    </View>
  );
};

export default DummyScreen;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
