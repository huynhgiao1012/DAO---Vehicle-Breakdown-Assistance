import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/loginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import GarageScreen from '../screens/GarageScreen';
import InfoScreen from '../screens/InfoScreen';
import MainScreen from '../screens/MainScreen';
import BookingScreen from '../screens/BookingScreen';
import OTPScreen from '../screens/OTPScreen';

const Stack = createStackNavigator();
export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          options={{headerShown: false}}
          component={WelcomeScreen}
        />
        <Stack.Screen
          name="Login"
          options={{headerShown: false}}
          component={LoginScreen}
        />
        <Stack.Screen
          name="SignUp"
          options={{headerShown: false}}
          component={SignUpScreen}
        />
        <Stack.Screen
          name="GarageDetail"
          options={{headerShown: false}}
          component={GarageScreen}
        />
        <Stack.Screen
          name="AppInfo"
          options={{headerShown: false}}
          component={InfoScreen}
        />
        <Stack.Screen
          name="Main"
          options={{headerShown: false}}
          component={MainScreen}
        />
        <Stack.Screen
          name="BookingScreen"
          options={{headerShown: false}}
          component={BookingScreen}
        />
        <Stack.Screen
          name="OTPScreen"
          options={{headerShown: false}}
          component={OTPScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
