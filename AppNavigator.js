import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/Home';
import VerifyOriginScreen from './screens/VerifyOrigin';
import QRScannerScreen from './screens/QRScanner';
import FailOriginScreen from './screens/FailOrigin';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen options={{ headerShown: false }}  name="Home" component={HomeScreen} />
        <Stack.Screen options={{ headerShown: false }}  name="VerifyOrigin" component={VerifyOriginScreen} />
        <Stack.Screen options={{ headerShown: false }}  name="QRScanner" component={QRScannerScreen} />
        <Stack.Screen options={{ headerShown: false }}  name="FailOrigin" component={FailOriginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;