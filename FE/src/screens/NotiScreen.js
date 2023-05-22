import {View, Text, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import Header from '../Components/Header';
import {useNavigation} from '@react-navigation/native';
import {themeColors} from '../theme';
import Icon from 'react-native-vector-icons/FontAwesome';
export default function NotiScreen() {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <Header />
      <View style={{backgroundColor: themeColors.white}}>
        <Text
          style={{
            alignSelf: 'center',
            fontWeight: 'bold',
            fontSize: 25,
            marginVertical: 20,
            color: themeColors.blue,
          }}>
          Notification
        </Text>
        <View
          style={{
            borderColor: themeColors.blue,
            borderWidth: 1,
            marginHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 10,
            marginBottom: 10,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginHorizontal: 20,
            }}>
            <Text
              style={{fontSize: 20, fontWeight: 600, color: themeColors.blue}}>
              Jonh Garage
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: themeColors.primaryColor2,
              }}>
              Processing...
            </Text>
          </View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: themeColors.gray60,
              marginHorizontal: 20,
            }}>
            Your service is processing now !!!
          </Text>
        </View>
        {/* <TouchableOpacity
          style={{
            alignSelf: 'flex-start',
          }}>
          <Icon
            name="times-circle"
            size={22}
            color={themeColors.primaryColor}
          />
        </TouchableOpacity> */}
      </View>
    </ScrollView>
  );
}
