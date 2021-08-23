import * as React from 'react';
import type {ScreenProps} from '@/@types/screens';
import {View, StyleSheet, Text, Image} from 'react-native';
import {phones, SIZE} from './Phones';
import Phone from './Phone';
import Button from './Button';

interface Props extends ScreenProps<RootStackParamList, 'MaskedView'> {}

const MaskedView: React.FunctionComponent<Props> = props => {
  const [selection, setSelection] = React.useState({
    back: phones[1],
    front: phones[0],
  });
  return (
    <View style={styles.container}>
      <View style={styles.picture}>
        {phones.map(p => (
          <Image
            source={p.picture}
            style={{
              ...StyleSheet.absoluteFillObject,
              width: undefined,
              height: undefined,
              opacity: p.id === selection.back.id ? 1 : 0,
            }}
            key={p.id}
          />
        ))}
        {phones.map(p => (
          <View
            key={p.id}
            style={{
              ...StyleSheet.absoluteFillObject,
              opacity: p.id === selection.front.id ? 1 : 0,
            }}>
            <Phone phone={p} selected={p.id === selection.front.id} />
          </View>
        ))}
      </View>
      <Text style={styles.title}>{selection.front.name}</Text>
      <View style={styles.colors}>
        {phones.map(p => (
          <Button
            key={p.id}
            backgroundColor={p.color}
            onPress={() => {
              if (p.id !== selection.front.id) {
                setSelection({back: selection.front, front: p});
              }
            }}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  picture: {
    width: SIZE,
    height: SIZE,
  },
  title: {
    padding: 16,
    fontSize: 24,
    lineHeight: 30,
    textAlign: 'center',
  },
  colors: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default MaskedView;
