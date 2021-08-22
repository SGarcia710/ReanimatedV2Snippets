import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREENS} from '@/constants/screens';

const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={({route, navigation}) => {
        return {
          headerShown: route.name !== 'Home',
        };
      }}>
      {React.Children.toArray(
        Object.values(SCREENS).map(screen => {
          return (
            <Stack.Screen name={screen.name} component={screen.component} />
          );
        }),
      )}
    </Stack.Navigator>
  );
}

export default RootNavigator;
