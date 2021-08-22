import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from '@/Navigation/Navigators/RootNavigator';

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
