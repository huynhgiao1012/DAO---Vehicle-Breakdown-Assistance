import {View, Text} from 'react-native';
import React, {useState} from 'react';
import Header from '../../Components/Header';
import {TouchableOpacity} from 'react-native';
import {themeColors} from '../../theme';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function GarageFormScreen() {
  const [status, setStatus] = useState('Waiting');
  const setStatusFilter = status => {
    setStatus(status);
  };
  const AcceptService = () => {};
  return (
    <View>
      <Header />
      <View style={{margin: 20}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            borderBottomColor: themeColors.gray,
            borderBottomWidth: 1,
            marginHorizontal: 10,
          }}>
          <TouchableOpacity
            onPress={() => setStatusFilter('Waiting')}
            style={[
              {
                width: '30%',
                paddingVertical: 10,
              },
              status === 'Waiting' && {
                backgroundColor: themeColors.primaryColor,
              },
            ]}>
            <Text
              style={[
                {
                  color: themeColors.blue,
                  fontSize: 18,
                  fontWeight: '600',
                  alignSelf: 'center',
                },
                status === 'Waiting' && {
                  color: themeColors.white,
                },
              ]}>
              WAITING
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setStatusFilter('Processing')}
            style={[
              {
                width: '45%',
                paddingVertical: 10,
              },
              status === 'Processing' && {
                backgroundColor: themeColors.primaryColor,
              },
            ]}>
            <Text
              style={[
                {
                  color: themeColors.blue,
                  fontSize: 18,
                  fontWeight: '600',
                  alignSelf: 'center',
                },
                status === 'Processing' && {
                  color: themeColors.white,
                },
              ]}>
              PROCESSING
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setStatusFilter('Done')}
            style={[
              {
                width: '25%',
                paddingVertical: 10,
              },
              status === 'Done' && {
                backgroundColor: themeColors.primaryColor,
              },
            ]}>
            <Text
              style={[
                {
                  color: themeColors.blue,
                  fontSize: 18,
                  fontWeight: '600',
                  alignSelf: 'center',
                },
                status === 'Done' && {
                  color: themeColors.white,
                },
              ]}>
              DONE
            </Text>
          </TouchableOpacity>
        </View>
        {status === 'Waiting' && (
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
        {status === 'Processing' && (
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
