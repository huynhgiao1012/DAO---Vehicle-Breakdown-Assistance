import 'react-native-gesture-handler';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {useEffect, useState} from 'react';
import socketService from './src/utils/socketService';
import {createStackNavigator} from '@react-navigation/stack';
import AppNavigation from './src/navigation/appNavigation';
import {Provider} from 'react-redux';
import {store} from './store';
const Stack = createStackNavigator();
const App = () => {
  const [message, setMessage] = useState('');
  const [data, setData] = useState([]);
  useEffect(() => {
    socketService.initializeSocket();
  }, []);
  useEffect(() => {
    socketService.on('receive_message', msg => {
      console.log('Message received in react native', msg);
    });
  }, []);
  const sendMessage = () => {
    socketService.emit('send_message', message);
  };
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  inputStyle: {
    height: 42,
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
  },
});
export default App;
