import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Recommendations from './screens/Recommendations';
import Search from './screens/Search';
import WantToRead from './screens/WantToRead';
import Book from './screens/Book';
import Read from './screens/Read';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} /> 
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Recommendations" component={Recommendations} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="WantToRead" component={WantToRead} />
        <Stack.Screen name="Book" component={Book} />
        <Stack.Screen name="Read" component={Read} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;