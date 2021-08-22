import * as React from 'react';
import {Dimensions} from 'react-native';
import {Card, Tabs} from '@/components';
import type {ScreenProps} from '@/@types/screens';
import {ScreenGroup, SCREEN_GROUPS} from '@/constants/screens';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const {width} = Dimensions.get('screen');

interface Props extends ScreenProps<RootStackParamList, 'Home'> {}

const Home: React.FunctionComponent<Props> = ({route, navigation}) => {
  const {top} = useSafeAreaInsets();
  const [selectedGroup, setSelectedGroup] = React.useState<ScreenGroup>(
    SCREEN_GROUPS.Basis,
  );
  return (
    <View style={[styles.container, {paddingTop: top}]}>
      <Text style={styles.headline}>
        Choose what you{' '}
        <Text
          style={{
            fontWeight: 'bold',
          }}>
          want to learn today
        </Text>
      </Text>
      <Tabs onPress={setSelectedGroup} selectedGroup={selectedGroup} />
      <ScrollView
        bounces={false}
        style={{
          width,
        }}
        contentContainerStyle={{
          alignItems: 'center',
        }}>
        {React.Children.toArray(
          selectedGroup.screens.map(screen => (
            <Card
              description={screen.description!}
              image={screen.image!}
              name={screen.title}
              onPress={() => {
                navigation.navigate(screen.name);
              }}
            />
          )),
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  headline: {
    paddingHorizontal: 30,
    fontSize: 36,
    marginBottom: 22,
  },
});

export default Home;
