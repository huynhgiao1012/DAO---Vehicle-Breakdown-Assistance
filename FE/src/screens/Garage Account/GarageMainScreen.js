import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {BackHandler, View, Text} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

// Screens
import GarageHomeScreen from './GarageHomeScreen';
import {themeColors} from '../../theme';
import {clearStorage} from '../../common/LocalStorage';
// import {useEffect} from 'react';
// import {useState} from 'react';
// import {getLocalStorageByKey} from '../common/LocalStorage';
import {KEY_TOKEN} from '../../utils/constants';
import GarageNotiScreen from './GarageNotiScreen';
import GarageFormScreen from './GarageFormScreen';
import {useEffect, useState} from 'react';
// import socketService from '../../utils/socketService';
import {io} from 'socket.io-client';
import {
  useCreateNotiMutation,
  useGetUnreadNotiMutation,
} from '../../services/Notification';
// import jwt_decode from 'jwt-decode';
const Tab = createBottomTabNavigator();

const GarageMainScreen = ({route}) => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([]);
  const [status, setStatus] = useState('home');
  const {socketIo} = route.params;
  const [unRead, setUnread] = useState([]);
  const [createNoti] = useCreateNotiMutation();
  const [getUnreadNoti] = useGetUnreadNotiMutation();
  useEffect(() => {
    socketIo.on('getNotification', data => {
      setNotifications(prev => [...prev, data]);
    });
    getUnreadNoti()
      .unwrap()
      .then(payload => {
        setUnread([]);
        if (payload) {
          payload.data.map(val => {
            if (val.status === 'unread') {
              setUnread(prev => [...prev, val]);
            }
          });
        }
      });
    console.log('noti', notifications);
  }, []);
  useEffect(() => {
    notifications.map(val => {
      createNoti({from: val.senderName, to: val.receiverName, text: val.text})
        .unwrap()
        .then(payload => {
          setNotifications([]);
        })
        .catch(error => {
          return error;
        });
    });
    getUnreadNoti()
      .unwrap()
      .then(payload => {
        setUnread([]);
        if (payload) {
          payload.data.map(val => {
            if (val.status === 'unread') {
              setUnread(prev => [...prev, val]);
            }
          });
        }
      });
  }, [notifications]);
  useEffect(() => {
    getUnreadNoti()
      .unwrap()
      .then(payload => {
        setUnread([]);
        if (payload) {
          payload.data.map(val => {
            if (val.status === 'unread') {
              setUnread(prev => [...prev, val]);
            }
          });
        }
      });
  }, [status]);
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // Do Whatever you want to do on back button click
        // Return true to stop default back navigaton
        // Return false to keep default back navigaton
        clearStorage(KEY_TOKEN);
        socketIo.emit('disconnectUser');
        navigation.navigate('Welcome');
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );
  return (
    <Tab.Navigator
      initialRouteName="GarageHomeScreen"
      screenOptions={({route, navigation}) => {
        if (navigation.getState().index === 0) {
          setStatus('home');
        } else if (navigation.getState().index === 1) {
          setStatus('form');
        } else if (navigation.getState().index === 2) {
          setStatus('noti');
        }
        return {
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let rn = route.name;
            if (rn === 'GarageHomeScreen') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (rn === 'GarageNotiScreen') {
              return (
                <View>
                  <Icon name="notifications" size={size} color={color} />
                  {unRead.length !== 0 && !navigation.isFocused() && (
                    <View
                      style={{
                        backgroundColor: 'red',
                        borderRadius: 20,
                        width: 20,
                        height: 20,
                        position: 'absolute',
                        top: -8,
                        right: -13,
                      }}>
                      <Text
                        style={{
                          alignSelf: 'center',
                          color: themeColors.white,
                          fontWeight: '600',
                        }}>
                        {unRead.length}
                      </Text>
                    </View>
                  )}
                </View>
              );
            } else if (rn === 'GarageFormScreen') {
              iconName = focused ? 'ios-create' : 'ios-create-outline';
            }
            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarStyle: {
            height: 50,
            backgroundColor: themeColors.primaryColor,
          },
          tabBarActiveTintColor: themeColors.primaryColor,
          tabBarInactiveTintColor: themeColors.white,
          tabBarActiveBackgroundColor: themeColors.white,
          tabBarShowLabel: false,
        };
      }}>
      <Tab.Screen
        name="GarageHomeScreen"
        component={GarageHomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="GarageFormScreen"
        component={GarageFormScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="GarageNotiScreen"
        component={GarageNotiScreen}
        options={{headerShown: false}}
        initialParams={{unRead: unRead}}
      />
    </Tab.Navigator>
  );
};

export default GarageMainScreen;
