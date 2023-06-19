import {View, Text} from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import {themeColors} from '../../theme';

export default function GarageService() {
  return (
    <View>
      <Header />
      <Text
        style={{
          color: themeColors.primaryColor,
          fontSize: 25,
          marginVertical: 20,
          alignSelf: 'center',
          fontWeight: 'bold',
        }}>
        Manage Service
      </Text>
    </View>
  );
}
