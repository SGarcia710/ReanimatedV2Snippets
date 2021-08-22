import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const {width} = Dimensions.get('screen');

interface CardProps {
  name: string;
  onPress: () => void;
  description: string;
  image: string;
}

const Card = (props: CardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{props.name}</Text>
        <Text style={styles.description}>{props.description}</Text>
        <TouchableOpacity onPress={props.onPress} style={styles.button}>
          <Text style={styles.buttonLabel}>Open</Text>
          <AntDesign name="play" size={16} color="black" />
        </TouchableOpacity>
      </View>
      <Image style={styles.image} source={{uri: props.image}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#5447B6',
    width: width - 30 * 2,
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 22,
    flexDirection: 'row',
    marginBottom: 24,
  },
  infoContainer: {
    width: 205,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  description: {
    color: 'white',
    marginBottom: 18,
  },
  image: {
    width: 130,
    height: 130,
  },
  button: {
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonLabel: {
    color: 'black',
    marginRight: 8,
  },
});

export default Card;
