import * as React from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Screens
import HomeScreen from './HomeScreen';
import InfoScreen from './InfoScreen';
import GarageScreen from './GarageScreen';
import MyInfo from './MyInfo';
import {themeColors} from '../theme';
import MyServiceScreen from './MyServiceScreen';

const Tab = createBottomTabNavigator();

function MainScreen() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      tabBarOptions={{
        activeTintColor: themeColors.primaryColor,
        inactiveTintColor: themeColors.gray60,
        labelStyle: {paddingBottom: 10, fontSize: 16, fontWeight: '700'},
        style: {
          padding: 10,
          height: 70,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Profile"
        component={MyInfo}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="My Service"
        component={MyServiceScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}

export default MainScreen;
