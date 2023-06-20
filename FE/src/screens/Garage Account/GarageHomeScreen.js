import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {themeColors} from '../../theme';
import {useGetCompanyAccountDetailQuery} from '../../services/User';
import {useNavigation} from '@react-navigation/native';
import {useGetAllFormGarageMutation} from '../../services/OrderForm';
import {useState} from 'react';

export default function GarageHomeScreen() {
  const userData = useGetCompanyAccountDetailQuery();
  const navigation = useNavigation();
  const [getAllFormGarage] = useGetAllFormGarageMutation();
  const [totalService, setTotalService] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  useEffect(() => {
    try {
      if (userData.isSuccess === true) {
        console.log('userData', userData);
        setTotalService(0);
        setTotalBalance(0);
      }
    } catch (error) {
      return '';
    }
  }, []);
  useEffect(() => {
    if (userData.data) {
      getAllFormGarage({id: userData.currentData.data._id})
        .unwrap()
        .then(payload => {
          setTotalService(payload.data.length);
          let num = 0;
          payload.data.map(val => {
            num = num + val.price;
          });
          setTotalBalance(num);
        });
    }
  }, [totalService]);
  return userData.isLoading === true && !userData.data ? (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <ActivityIndicator size="large" color={themeColors.primaryColor} />
    </View>
  ) : (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <Text style={styles.text}>WELCOME HOME,</Text>
        <Text
          style={{
            color: themeColors.white,
            fontSize: 25,
            fontWeight: 'bold',
            paddingTop: 10,
            marginHorizontal: 50,
          }}>
          {userData.data ? userData.currentData.data.name : ''}
        </Text>
      </View>
      <View style={styles.body}>
        <Text
          style={{
            color: themeColors.primaryColor,
            fontSize: 22,
            fontWeight: '700',
          }}>
          Statistics
        </Text>
        <View
          style={{
            marginVertical: 10,
            marginRight: 20,
            borderTopRightRadius: 60,
            backgroundColor: themeColors.primaryColor,
            paddingVertical: 20,
            paddingRight: 20,
            width: '95%',
          }}>
          <View style={styles.statisticText}>
            <Text style={styles.text2}>Total Booked Service</Text>
            <Text style={styles.text2}>{totalService}</Text>
          </View>
          <View style={styles.statisticText}>
            <Text style={styles.text2}>Total Balance</Text>
            <Text style={styles.text2}>{totalBalance}</Text>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}>
          <View style={{marginVertical: 10, marginRight: 10}}>
            <TouchableOpacity
              style={{
                borderTopLeftRadius: 15,
                backgroundColor: themeColors.blue,
                padding: 15,
                marginVertical: 10,
              }}
              onPress={() =>
                navigation.navigate('GarageService', {
                  id: userData.currentData.data._id,
                })
              }>
              <Text style={styles.buttonText}>Manage Service</Text>
            </TouchableOpacity>
            <View
              style={{
                borderBottomLeftRadius: 15,
                backgroundColor: themeColors.blue,
                padding: 15,
                marginVertical: 10,
              }}></View>
          </View>
          <View style={{marginVertical: 10}}>
            <View
              style={{
                borderTopRightRadius: 15,
                backgroundColor: themeColors.blue,
                padding: 15,
                marginVertical: 10,
              }}></View>
            <TouchableOpacity
              style={{
                borderBottomRightRadius: 15,
                backgroundColor: themeColors.blue,
                padding: 15,
                marginVertical: 10,
              }}
              onPress={() => navigation.navigate('GarageChangePass')}>
              <Text style={styles.buttonText}>Change Password</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text
          style={{
            color: themeColors.primaryColor,
            fontSize: 20,
            fontWeight: '700',
          }}>
          Information
        </Text>
        <View
          style={{
            marginVertical: 10,
            marginRight: 20,
            borderBottomLeftRadius: 40,
            backgroundColor: themeColors.primaryColor,
            paddingVertical: 10,
            paddingHorizontal: 25,
            width: '95%',
            height: 100,
          }}>
          <Text style={styles.text3}>
            Email: {userData.data ? userData.currentData.data.email : ''}
          </Text>
          <Text style={styles.text3}>
            Phone: {userData.data ? userData.currentData.data.phone : ''}
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: themeColors.primaryColor,
    padding: 20,
    borderBottomLeftRadius: 100,
    marginBottom: 30,
  },
  text: {
    color: themeColors.white,
    fontSize: 22,
    paddingHorizontal: 20,
    fontWeight: '600',
    fontStyle: 'italic',
  },
  body: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopRightRadius: 100,
    flex: 1,
    borderWidth: 2,
    borderColor: themeColors.primaryColor,
  },
  statisticText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingHorizontal: 30,
    marginVertical: 8,
  },
  text2: {
    color: themeColors.white,
    fontSize: 18,
    fontWeight: '500',
  },
  text3: {
    color: themeColors.white,
    fontSize: 18,
    fontWeight: '500',
    marginVertical: 5,
  },
  button: {
    backgroundColor: themeColors.blue,
    padding: 15,
    borderRadius: 15,
    marginVertical: 10,
  },
  buttonText: {
    color: themeColors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
