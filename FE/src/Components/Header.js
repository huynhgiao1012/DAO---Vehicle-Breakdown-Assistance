import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {themeColors} from '../theme';
import {useNavigation} from '@react-navigation/native';

export default function Header() {
  const navigation = useNavigation();

  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: themeColors.primaryColor,
      }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon
          name="arrow-left"
          size={26}
          color={themeColors.white}
          style={{marginVertical: 10, marginHorizontal: 20}}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Icon
          name="power-off"
          size={26}
          color={themeColors.white}
          style={{marginVertical: 10, marginHorizontal: 20}}
        />
      </TouchableOpacity>
    </View>
  );
}
