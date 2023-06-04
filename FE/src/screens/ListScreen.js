import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  Dimensions,
  ScrollView,
  FlatList,
} from 'react-native';
import React from 'react';
import {themeColors} from '../theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

// subscribe for more videos like this :)
export default function ListScreen() {
  const navigation = useNavigation();
  const data = [
    {
      name: 'Jonh Garage',
      address: 'ABC Street, D City',
      distance: '10km',
      id: 1,
    },
    {
      name: 'Jonh Garage',
      address: 'ABC Street, D City',
      distance: '10km',
      id: 2,
    },
    {
      name: 'Jonh Garage',
      address: 'ABC Street, D City',
      distance: '10km',
      id: 3,
    },
    {
      name: 'Jonh Garage',
      address: 'ABC Street, D City',
      distance: '10km',
      id: 4,
    },
    {
      name: 'Jonh Garage',
      address: 'ABC Street, D City',
      distance: '10km',
      id: 5,
    },
    {
      name: 'Jonh Garage',
      address: 'ABC Street, D City',
      distance: '10km',
      id: 6,
    },
    {
      name: 'Jonh Garage',
      address: 'ABC Street, D City',
      distance: '10km',
      id: 7,
    },
    {
      name: 'Jonh Garage',
      address: 'ABC Street, D City',
      distance: '10km',
      id: 8,
    },
    {
      name: 'Jonh Garage',
      address: 'ABC Street, D City',
      distance: '10km',
      id: 9,
    },
    {
      name: 'Jonh Garage',
      address: 'ABC Street, D City',
      distance: '10km',
      id: 10,
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.boxHeader}>
        <TouchableOpacity
          onPress={() => {
            setDistanceNum(10);
          }}
          style={styles.distance}>
          <Text style={styles.text}>10 km</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setDistanceNum(30);
          }}
          style={styles.distance}>
          <Text style={styles.text}>30 km</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setDistanceNum(50);
          }}
          style={styles.distance}>
          <Text style={styles.text}>50 km</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={{marginBottom: 50}}
        ItemSeparatorComponent={
          Platform.OS !== 'android' &&
          (({highlighted}) => (
            <View style={[styles.separator, highlighted && {marginLeft: 0}]} />
          ))
        }
        data={data}
        renderItem={({item, index, separators}) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => navigation.navigate('GarageDetail')}>
            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderWidth: 1,
                marginHorizontal: 20,
                borderColor: themeColors.gray,
                marginVertical: 10,
                borderRadius: 20,
              }}>
              <Text
                style={{
                  paddingBottom: 10,
                  fontWeight: '900',
                  fontSize: 18,
                  color: themeColors.blue,
                }}>
                {item.name}
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
                  {item.address}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: themeColors.gray60,
                    fontWeight: '800',
                  }}>
                  {item.distance}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: themeColors.white,
  },
  item: {
    backgroundColor: themeColors.white,
  },
  boxHeader: {
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  distance: {
    backgroundColor: themeColors.blue,
    borderWidth: 1,
    margin: 10,
    width: 70,
    padding: 8,
    borderRadius: 15,
    borderColor: themeColors.blue,
  },
  text: {
    color: themeColors.white,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
