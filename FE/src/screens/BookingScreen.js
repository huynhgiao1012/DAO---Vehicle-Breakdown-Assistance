import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Header from '../Components/Header';
import {ScrollView} from 'react-native-gesture-handler';
import {themeColors} from '../theme';
import {useNavigation} from '@react-navigation/native';

export default function BookingScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <Header />
      <Text
        style={{
          alignSelf: 'center',
          fontWeight: 'bold',
          fontSize: 20,
          marginTop: 20,
          color: themeColors.blue,
        }}>
        SERVICE BOOKING
      </Text>
      <View>
        <Text style={styles.text}>Name:</Text>
        <Text style={styles.text}>Phone:</Text>
        <Text style={styles.text}>Address:</Text>
        <Text style={styles.text}>Service:</Text>
        <Text style={{marginHorizontal: 20, fontStyle: 'italic'}}>
          Marking Your Address In Map Correctly
        </Text>
        <View style={styles.markAddress}></View>
      </View>
      <View
        style={{
          backgroundColor: themeColors.gray,
          marginHorizontal: 20,
          marginVertical: 10,
          borderRadius: 10,
        }}>
        <Text style={styles.text}>Company Name:</Text>
        <Text style={styles.text}>Phone:</Text>
        <Text style={styles.text}>Address:</Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginHorizontal: 20,
          backgroundColor: themeColors.blue,
          padding: 10,
          borderRadius: 5,
        }}>
        <Text
          style={{fontSize: 18, fontWeight: '600', color: themeColors.white}}>
          Total Price:{' '}
        </Text>
        <Text
          style={{fontSize: 18, fontWeight: '600', color: themeColors.white}}>
          20${' '}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('OTPScreen')}
        style={{
          alignSelf: 'center',
          backgroundColor: themeColors.primaryColor,
          padding: 10,
          width: 100,
          borderRadius: 10,
          marginVertical: 20,
        }}>
        <Text
          style={{
            color: themeColors.white,
            textAlign: 'center',
            fontSize: 18,
            fontWeight: 'bold',
          }}>
          Booking
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  markAddress: {
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: themeColors.blue,
    width: '90%',
    height: 150,
    borderRadius: 10,
  },
  text: {
    marginHorizontal: 20,
    marginVertical: 8,
    fontSize: 18,
    fontWeight: '600',
    color: themeColors.blue,
  },
});
