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
import {StripeProvider} from '@stripe/stripe-react-native';
const App = () => {
  LogBox.ignoreAllLogs();
  const socketIo = io('http://localhost:3000');
  return (
    <Provider store={store}>
      <StripeProvider publishableKey="pk_test_51NKv7XIatF4AkN7lXFtn9bY3x27QAR6zTjzF3ZP6IcHSuMQUQoDDTqk5IVgLi3SB4egRfjO2rjLMiYYkcZWqkXyM00gug1pEcn">
        <AppNavigation socketIo={socketIo} />
      </StripeProvider>
    </Provider>
  );
};

export default App;
