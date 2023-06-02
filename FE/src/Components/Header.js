import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {themeColors} from '../theme';
import {useNavigation} from '@react-navigation/native';
import {clearStorage} from '../common/LocalStorage';
import {KEY_TOKEN} from '../utils/constants';

export default function Header() {
  const navigation = useNavigation();
  const logout = () => {
    clearStorage(KEY_TOKEN);
    navigation.navigate('Login');
  };
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
      <TouchableOpacity onPress={logout}>
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
