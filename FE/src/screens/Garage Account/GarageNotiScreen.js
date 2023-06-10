import {View, Text} from 'react-native';
import React, {useState} from 'react';
import Header from '../../Components/Header';
import {TouchableOpacity} from 'react-native';
import {themeColors} from '../../theme';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function GarageNotiScreen() {
  const [status, setStatus] = useState('Unread');
  const setStatusFilter = status => {
    setStatus(status);
  };
  const AcceptService = () => {};
  return (
    <View>
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
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            borderBottomColor: themeColors.gray,
            borderBottomWidth: 1,
          }}>
          <TouchableOpacity
            onPress={() => setStatusFilter('Unread')}
            style={[
              {
                padding: 10,
                width: '50%',
              },
              status === 'Unread' && {
                borderBottomWidth: 2,
                borderBottomColor: themeColors.primaryColor,
              },
            ]}>
            <Text
              style={{
                color: themeColors.blue,
                fontSize: 18,
                fontWeight: '600',
                alignSelf: 'center',
              }}>
              Unread
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setStatusFilter('Read')}
            style={[
              {
                padding: 10,
                width: '50%',
              },
              status === 'Read' && {
                borderBottomWidth: 2,
                borderBottomColor: themeColors.primaryColor,
              },
            ]}>
            <Text
              style={{
                color: themeColors.blue,
                fontSize: 18,
                fontWeight: '600',
                alignSelf: 'center',
              }}>
              Read
            </Text>
          </TouchableOpacity>
        </View>
        {status === 'Unread' && (
          <View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: themeColors.gray,
                paddingVertical: 10,
              }}>
              <View
                style={{
                  padding: 10,
                  borderRadius: 10,
                  width: '80%',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color: themeColors.blue,
                  }}>
                  Jonh has booked your service
                </Text>
              </View>
              <TouchableOpacity
                onPress={AcceptService}
                style={{
                  width: '15%',
                  padding: 10,
                  backgroundColor: themeColors.blue,
                  borderRadius: 10,
                  marginLeft: 10,
                }}>
                <Icon
                  name="check"
                  size={20}
                  color={themeColors.white}
                  style={{alignSelf: 'center'}}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        {status === 'Read' && (
          <View>
            <View
              style={{
                padding: 15,
                borderRadius: 10,
                width: '100%',
                borderBottomWidth: 1,
                borderBottomColor: themeColors.gray,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: themeColors.gray60,
                }}>
                Jonh has booked your service
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
