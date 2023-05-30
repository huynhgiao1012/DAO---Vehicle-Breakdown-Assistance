import {View, Image, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import Header from '../Components/Header';
import {themeColors} from '../theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useGetUserDetailQuery, useGetUserPointQuery} from '../services/User';
import {useEffect} from 'react';

export default function MyInfo() {
  const userData = useGetUserDetailQuery();
  const userPoint = useGetUserPointQuery();

  useEffect(() => {
    console.log('userData', userData);
  }, []);
  return !userData.isSuccess && !userPoint.isSuccess ? (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <ActivityIndicator size="large" color={themeColors.primaryColor} />
    </View>
  ) : (
    <View
      style={{
        flex: 1,
        backgroundColor: themeColors.primaryColor,
        alignSelf: 'center',
        width: '100%',
      }}>
      <Header />
      <View
        style={{
          padding: 20,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 50,
        }}>
        <Image
          source={require('../../assets/images/welcome.png')}
          style={{
            width: 100,
            height: 100,
            borderRadius: 20,
            borderWidth: 2,
            borderColor: themeColors.white,
          }}
        />
        <Text
          style={{
            fontSize: 30,
            marginHorizontal: 20,
            color: themeColors.white,
            fontWeight: 'bold',
          }}>
          HELLO ! {userData.currentData.data.name}
        </Text>
      </View>
      <View style={{marginHorizontal: 20}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <Icon
            name="address-book"
            size={24}
            color={themeColors.white}
            style={{alignSelf: 'center'}}
          />
          <Text
            style={{
              fontSize: 24,
              paddingLeft: 10,
              color: themeColors.white,
              fontWeight: 'bold',
            }}>
            CONTACT
          </Text>
        </View>
        <Text
          style={{
            fontSize: 18,
            color: themeColors.white,
            fontWeight: 'bold',
            paddingVertical: 10,
          }}>
          Email: {userData.currentData.data.email}
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: themeColors.white,
            fontWeight: 'bold',
            paddingVertical: 10,
          }}>
          Phone: {userData.currentData.data.phone}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: themeColors.white,
          marginHorizontal: 20,
          borderRadius: 20,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
          marginVertical: 15,
        }}>
        <Text
          style={{
            fontSize: 18,
            color: themeColors.primaryColor,
            fontWeight: 'bold',
            paddingVertical: 10,
          }}>
          Point:
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: themeColors.primaryColor,
            fontWeight: 'bold',
            paddingVertical: 10,
          }}>
          {userPoint.currentData.data.point}
        </Text>
      </View>
    </View>
  );
}
