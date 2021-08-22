import * as React from 'react';
import DummyScreen from './DummyScreen';
import type {ScreenProps} from '@/@types/screens';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

interface Props
  extends ScreenProps<RootStackParamList, 'CustomBottomTabNavigator'> {}

const CustomBottomTabNavigator: React.FunctionComponent<Props> = props => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'black',
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <AntDesign
                name="home"
                size={16}
                color={focused === true ? 'black' : 'gray'}
              />
            );
          },
        }}
        name="Home">
        {() => {
          return <DummyScreen text="Screen 1" />;
        }}
      </Tab.Screen>
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <FontAwesome
                name="user"
                size={16}
                color={focused === true ? 'black' : 'gray'}
              />
            );
          },
        }}
        name="Profile">
        {() => {
          return <DummyScreen text="Screen 2" />;
        }}
      </Tab.Screen>
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <FontAwesome
                name="inbox"
                size={16}
                color={focused === true ? 'black' : 'gray'}
              />
            );
          },
        }}
        name="Messages">
        {() => {
          return <DummyScreen text="Screen 3" />;
        }}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default CustomBottomTabNavigator;
