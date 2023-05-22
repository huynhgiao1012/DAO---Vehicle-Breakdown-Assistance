import {View, Text, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import Header from '../Components/Header';
import {useNavigation} from '@react-navigation/native';
import {themeColors} from '../theme';

export default function MyServiceScreen() {
  const navigation = useNavigation();
  const data = [
    {
      name: 'Jonh Garage',
      address: 'ABC Street, D City',
      service: 'Fuel',
      date: '12/03/2023',
      price: '14$',
      id: 1,
    },
    {
      name: 'Jonh Garage',
      address: 'ABC Street, D City',
      service: 'Fuel',
      date: '12/03/2023',
      price: '14$',
      id: 2,
    },
    {
      name: 'Jonh Garage',
      address: 'ABC Street, D City',
      service: 'Fuel',
      date: '12/03/2023',
      price: '14$',
      id: 3,
    },
    {
      name: 'Jonh Garage',
      address: 'ABC Street, D City',
      service: 'Fuel',
      date: '12/03/2023',
      price: '14$',
      id: 4,
    },
    {
      name: 'Jonh Garage',
      address: 'ABC Street, D City',
      service: 'Fuel',
      date: '12/03/2023',
      price: '14$',
      id: 5,
    },
  ];
  const showModal = () => {};
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
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      color: themeColors.gray60,
                      fontStyle: 'italic',
                    }}>
                    {item.date}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    color: themeColors.gray60,
                    fontStyle: 'italic',
                  }}>
                  {item.address}
                </Text>
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
                    {item.service}
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
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  );
}
