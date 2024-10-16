import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Recommendations from './screens/Recommendations';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteNavigator="Home">
        <Stack.Screen name="Home" component={Home} /> 
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Recommendations" component={Recommendations} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;