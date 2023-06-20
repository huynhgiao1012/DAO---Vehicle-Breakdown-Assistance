import {View, Text, Dimensions, TouchableOpacity, Animated} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../Components/Header';
import {useNavigation} from '@react-navigation/native';
import {themeColors} from '../theme';
import {
  useGetUnreadNotiMutation,
  useUpdateNotiMutation,
} from '../services/Notification';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleSheet} from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;

export default function NotiScreen() {
  const navigation = useNavigation();
  const [status, setStatus] = useState('new');
  const [getUnreadNoti] = useGetUnreadNotiMutation();
  const [updateNoti] = useUpdateNotiMutation();
  const [unRead, setUnread] = useState([]);

  useEffect(() => {
    getUnreadNoti()
      .unwrap()
      .then(payload => {
        setUnread([]);
        console.log(payload);
        if (payload) {
          setUnread(prev => [...prev, ...payload.data].reverse());
        }
      });
  }, []);

  const handlePress = id => {
    setStatus('old');
    updateNoti({id: id})
      .unwrap()
      .then(() => {
        getUnreadNoti()
          .unwrap()
          .then(payload => {
            setUnread([]);
            if (payload) {
              setUnread(prev => [...prev, ...payload.data]);
            }
          });
      });
  };
  const rightSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [1, 100],
      outputRange: [1.2, 0.6],
      extrapolate: 'clamp',
    });
    return (
      <TouchableOpacity activeOpacity={0.6} onPress={() => {}}>
        <View style={styles.deleteBox}>
          <Animated.Text
            style={{
              transform: [{scale: scale}],
            }}>
            <Icon name="trash" size={22} color={themeColors.white} />
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{backgroundColor: themeColors.white, flex: 1}}>
      <Header />
      <View style={{margin: 20}}>
        <Text
          style={{
            color: themeColors.primaryColor,
            fontSize: 26,
            fontWeight: '700',
            alignSelf: 'center',
          }}>
          Notification
        </Text>
        {unRead.map(val => {
          if (val.status === 'unread') {
            return (
              <TouchableOpacity
                onPress={() => handlePress(val._id)}
                key={val._id}>
                <Swipeable renderRightActions={rightSwipe}>
                  <View style={styles.container}>
                    {status === 'new' && (
                      <View
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          backgroundColor: 'red',
                          padding: 3,
                        }}>
                        <Text style={{color: themeColors.white, fontSize: 10}}>
                          New
                        </Text>
                      </View>
                    )}
                    <Text style={styles.text1}>{val.text}</Text>
                  </View>
                </Swipeable>
              </TouchableOpacity>
            );
          }
          if (val.status === 'read') {
            return (
              <Swipeable renderRightActions={rightSwipe} key={val._id}>
                <View style={styles.container}>
                  <Text style={styles.text2}>{val.text}</Text>
                </View>
              </Swipeable>
            );
          }
        })}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 100,
    width: SCREEN_WIDTH - 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 16,
    borderBottomColor: themeColors.primaryColor2,
    borderBottomWidth: 2,
    marginVertical: 10,
  },
  deleteBox: {
    backgroundColor: themeColors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 100,
    marginVertical: 10,
  },
  text1: {
    color: themeColors.blue,
    fontSize: 16,
    fontWeight: '600',
    width: '90%',
    marginTop: 5,
  },
  text2: {
    color: themeColors.gray60,
    fontSize: 16,
    width: '90%',
  },
});
