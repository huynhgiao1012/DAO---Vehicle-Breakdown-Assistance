import {View, Image, Text} from 'react-native';
import React from 'react';
import Header from '../Components/Header';
import {themeColors} from '../theme';

export default function InfoScreen() {
  const images = [
    require('../../assets/images/image1.jpg'),
    require('../../assets/images/image2.jpg'),
    require('../../assets/images/image3.jpg'),
    require('../../assets/images/image4.jpg'),
  ];
  return (
    <View style={{backgroundColor: themeColors.primaryColor, flex: 1}}>
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
      </View>
    </View>
  );
}
