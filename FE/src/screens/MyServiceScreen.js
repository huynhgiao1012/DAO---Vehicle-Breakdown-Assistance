import {View, Text, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import Header from '../Components/Header';
import {useNavigation} from '@react-navigation/native';
import {themeColors} from '../theme';
import {useGetAllFormCustomerMutation} from '../services/OrderForm';
import {useState} from 'react';

export default function MyServiceScreen() {
  const navigation = useNavigation();
  const [getAllFOrm] = useGetAllFormCustomerMutation();
  const [data, setData] = useState([]);
  useEffect(() => {
    getAllFOrm()
      .unwrap()
      .then(payload => {
        if (payload) {
          setData([]);
          payload.data.map(val => {
            setData(prev => [...prev, val]);
          });
        }
      });
  }, []);
  const showModal = () => {};
  return (
    <View>
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
          Booked Service
        </Text>
        <FlatList
          style={{backgroundColor: 'white'}}
          ItemSeparatorComponent={
            Platform.OS !== 'android' &&
            (({highlighted}) => (
              <View
                style={[styles.separator, highlighted && {marginLeft: 0}]}
              />
            ))
          }
          data={data}
          renderItem={({item, index, separators}) => (
            <TouchableOpacity key={item.id} onPress={showModal()}>
              <View
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderTopWidth: 1,
                  marginHorizontal: 20,
                  borderTopColor: themeColors.gray,
                  marginVertical: 10,
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignContent: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontWeight: '900',
                      fontSize: 18,
                      color: themeColors.blue,
                    }}>
                    {item.garageId.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      color: themeColors.gray60,
                      fontStyle: 'italic',
                    }}>
                    {item.date.slice(0, 10).split('-').reverse().join('-')}
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: themeColors.gray60,
                    }}>
                    {item.serviceId.type}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: themeColors.gray60,
                      fontWeight: '800',
                    }}>
                    {item.price}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 18,
                    color: themeColors.primaryColor,
                    fontStyle: 'italic',
                    fontWeight: 'bold',
                  }}>
                  {item.status}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
