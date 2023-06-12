import 'react-native-gesture-handler';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
  LogBox,
} from 'react-native';
import React from 'react';
import {useEffect, useState} from 'react';
import socketService from './src/utils/socketService';
import {createStackNavigator} from '@react-navigation/stack';
import AppNavigation from './src/navigation/appNavigation';
import {Provider} from 'react-redux';
import {store} from './src/store/index.js';
import {io} from 'socket.io-client';

const App = () => {
  LogBox.ignoreAllLogs();
  const socketIo = io('http://localhost:3000');
  return (
    <Provider store={store}>
      <AppNavigation socketIo={socketIo} />
    </Provider>
  );
};

export default App;
