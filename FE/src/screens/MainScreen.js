import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {AsyncStorage} from 'react-native';
// Screens
import HomeScreen from './HomeScreen';
import InfoScreen from './InfoScreen';
import {themeColors} from '../theme';
import MyServiceScreen from './MyServiceScreen';
import NotiScreen from './NotiScreen';

const Tab = createBottomTabNavigator();

function MainScreen() {
  const value = AsyncStorage.getItem('TOKEN');
  console.log(value);
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let rn = route.name;

          if (rn === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (rn === 'My Service') {
            iconName = focused ? 'ios-create' : 'ios-create-outline';
          } else if (rn === 'Notification') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (rn === 'Information') {
            iconName = focused
              ? 'information-circle'
              : 'information-circle-outline';
          }
          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          height: 45,
          backgroundColor: themeColors.primaryColor,
        },
        tabBarActiveTintColor: themeColors.primaryColor,
        tabBarInactiveTintColor: themeColors.white,
        tabBarActiveBackgroundColor: themeColors.white,
        tabBarShowLabel: false,
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="My Service"
        component={MyServiceScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Notification"
        component={NotiScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Information"
        component={InfoScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}

export default MainScreen;
