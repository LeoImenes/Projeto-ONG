import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox } from 'react-native';

import Login from './pages/Login'
import ContainerHome from './pages/container_home/containerhome'

const Stack = createNativeStackNavigator();
LogBox.ignoreAllLogs();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ContainerHome" component={ContainerHome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}