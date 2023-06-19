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
import MyInfo from '../screens/MyInfo';
import RatingScreen from '../screens/RatingScreen';
import GarageMainScreen from '../screens/Garage Account/GarageMainScreen';
import GarageNotiScreen from '../screens/Garage Account/GarageNotiScreen';
import GarageFormScreen from '../screens/Garage Account/GarageFormScreen';
import ViewPathScreen from '../screens/Garage Account/ViewPathScreen';
import GarageChangePass from '../screens/Garage Account/GarageChangePass';
import GarageService from '../screens/Garage Account/GarageService';
import ForgotPassword from '../screens/ForgotPassword';
const Stack = createStackNavigator();
export default function AppNavigation(props) {
  console.log(props.socketIo);
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
          initialParams={{socketIo: props.socketIo}}
        />
        <Stack.Screen
          name="SignUp"
          options={{headerShown: false}}
          component={SignUpScreen}
        />
        <Stack.Screen
          name="ForgotPassword"
          options={{headerShown: false}}
          component={ForgotPassword}
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
          initialParams={{socketIo: props.socketIo}}
        />
        <Stack.Screen
          name="GarageMain"
          options={{headerShown: false}}
          component={GarageMainScreen}
          initialParams={{socketIo: props.socketIo}}
        />
        <Stack.Screen
          name="BookingScreen"
          options={{headerShown: false}}
          component={BookingScreen}
          initialParams={{socketIo: props.socketIo}}
        />
        <Stack.Screen
          name="OTPScreen"
          options={{headerShown: false}}
          component={OTPScreen}
        />
        <Stack.Screen
          name="MyInfo"
          options={{headerShown: false}}
          component={MyInfo}
        />
        <Stack.Screen
          name="RatingScreen"
          options={{headerShown: false}}
          component={RatingScreen}
        />
        <Stack.Screen
          name="GarageNotiScreen"
          options={{headerShown: false}}
          component={GarageNotiScreen}
        />
        <Stack.Screen
          name="GarageFormScreen"
          options={{headerShown: false}}
          component={GarageFormScreen}
        />
        <Stack.Screen
          name="ViewPathScreen"
          options={{headerShown: false}}
          component={ViewPathScreen}
        />
        <Stack.Screen
          name="GarageChangePass"
          options={{headerShown: false}}
          component={GarageChangePass}
        />
        <Stack.Screen
          name="GarageService"
          options={{headerShown: false}}
          component={GarageService}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
