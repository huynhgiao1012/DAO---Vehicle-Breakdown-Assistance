import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {BackHandler, View, Text} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import jwt_decode from 'jwt-decode';
// Screens
import HomeScreen from './HomeScreen';
import InfoScreen from './InfoScreen';
import {themeColors} from '../theme';
import MyServiceScreen from './MyServiceScreen';
import NotiScreen from './NotiScreen';
import {clearStorage, getLocalStorageByKey} from '../common/LocalStorage';
// import {useEffect} from 'react';
// import {useState} from 'react';
import {KEY_TOKEN} from '../utils/constants';
import {useEffect, useState} from 'react';
// import socketService from '../utils/socketService';
import {io} from 'socket.io-client';
import jwtDecode from 'jwt-decode';
import {
  useCreateNotiMutation,
  useGetUnreadNotiMutation,
} from '../services/Notification';

const Tab = createBottomTabNavigator();

const MainScreen = ({route}) => {
  const {socketIo} = route.params;
  const [status, setStatus] = useState('home');
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState('');
  const [socket, setSocket] = useState(null);
  const navigation = useNavigation();
  const [unRead, setUnread] = useState([]);
  const [createNoti] = useCreateNotiMutation();
  const [getUnreadNoti] = useGetUnreadNotiMutation();
  useEffect(() => {
    socketIo.on('getNotification', data => {
      console.log(data);
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
      initialRouteName="HomeScreen"
      screenOptions={({route, navigation}) => {
        if (navigation.getState().index === 0) {
          setStatus('home');
        } else if (navigation.getState().index === 1) {
          setStatus('form');
        } else if (navigation.getState().index === 2) {
          setStatus('noti');
        } else if (navigation.getState().index === 3) {
          setStatus('newfeeds');
        } else {
          setStatus('info');
        }
        return {
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let rn = route.name;

            if (rn === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (rn === 'My Service') {
              iconName = focused ? 'ios-create' : 'ios-create-outline';
            } else if (rn === 'Notification') {
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
            } else if (rn === 'Information') {
              iconName = focused
                ? 'information-circle'
                : 'information-circle-outline';
            } else if (rn === 'Newfeeds') {
              iconName = focused ? 'newspaper' : 'newspaper-outline';
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
        };
      }}>
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
        name="Newfeeds"
        component={InfoScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Information"
        component={InfoScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default MainScreen;
