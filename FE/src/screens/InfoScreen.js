import {View, Image, Text, ScrollView} from 'react-native';
import React from 'react';
import Header from '../Components/Header';
import {themeColors} from '../theme';

export default function InfoScreen() {
  return (
    <ScrollView style={{backgroundColor: themeColors.primaryColor, flex: 1}}>
      <Header />
      <Image
        source={require('../../assets/images/logo2.png')}
        style={{
          width: 180,
          height: 180,
          marginVertical: 10,
          alignSelf: 'center',
        }}
      />
      <View
        style={{
          backgroundColor: themeColors.white,
          marginHorizontal: 20,
          padding: 20,
          borderRadius: 20,
        }}>
        <Text style={{textAlign: 'justify', color: themeColors.gray60}}>
          Here the users of DAO - On Road Vehicle Breakdown Assistance (ORVBA)
          system can search for list of mechanic at any location or the nearby
          locations which will help them in an unexpected situations raised by
          the mechanical issues of their vehicles.
        </Text>
        <Image
          source={require('../../assets/images/image4.jpg')}
          style={{
            width: '100%',
            height: 200,
            marginVertical: 10,
            alignSelf: 'center',
            borderRadius: 20,
            borderColor: themeColors.primaryColor,
            borderWidth: 2,
          }}
        />
        <Image
          source={require('../../assets/images/image3.jpg')}
          style={{
            width: '100%',
            height: 200,
            marginVertical: 10,
            alignSelf: 'center',
            borderRadius: 20,
            borderColor: themeColors.primaryColor,
            borderWidth: 2,
          }}
        />
        <Image
          source={require('../../assets/images/image2.jpg')}
          style={{
            width: '100%',
            height: 200,
            marginVertical: 10,
            alignSelf: 'center',
            borderRadius: 20,
            borderColor: themeColors.primaryColor,
            borderWidth: 2,
          }}
        />
      </View>

      <Text
        style={{
          fontStyle: 'italic',
          color: themeColors.blue,
          fontSize: 16,
          alignSelf: 'center',
          marginVertical: 10,
          fontWeight: '600',
        }}>
        Published: 2023
      </Text>
    </ScrollView>
  );
}
