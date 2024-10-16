// /**
//  * @format
//  */


import React from 'react';
import 'react-native-gesture-handler';
import { AppRegistry, Text, View } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
