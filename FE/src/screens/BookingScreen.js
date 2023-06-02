import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useRef} from 'react';
import Header from '../Components/Header';
import {ScrollView} from 'react-native-gesture-handler';
import {themeColors} from '../theme';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {useGetUserDetailQuery} from '../services/User';
import MapView, {Marker} from 'react-native-maps';
import GetLocation from 'react-native-get-location';
export default function BookingScreen({route}) {
  const navigation = useNavigation();
  const userData = useGetUserDetailQuery();
  const [addPrice, setAddPrice] = useState(20);
  const {id, accountId, serviceName, servicePrice} = route.params;
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState({
    latitude: 10.5369728,
    longitude: 106.6734779,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  const mapRef = useRef(null);

  useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    if (loading) return;
    mapRef.current?.animateToRegion(region);
  }, [region]);

  const requestPermission = async () => {
    if (Platform.OS == 'android') {
      getCurrentLocation();
    } else {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      console.log(granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) getCurrentLocation();
      else {
        alert('notGranted');
      }
    }
  };

  const getCurrentLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 20000,
    })
      .then(location => {
        setRegion({
          ...region,
          latitude: location.latitude,
          longitude: location.longitude,
        });
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
    setLoading(false);
  };

  if (loading)
    return (
      <View style={styles.container}>
        <ActivityIndicator size={55} color="grey" />
      </View>
    );
  return (
    <ScrollView>
      <Header />
      <Text
        style={{
          alignSelf: 'center',
          fontWeight: 'bold',
          fontSize: 20,
          marginTop: 20,
          color: themeColors.blue,
        }}>
        SERVICE BOOKING
      </Text>
      <View>
        <Text style={styles.text}>
          Name: {userData.data ? userData.currentData.data.name : ''}
        </Text>
        <Text style={styles.text}>
          Phone: {userData.data ? userData.currentData.data.phone : ''}
        </Text>
        <Text style={styles.text}>Address:</Text>
        <Text style={styles.text}>Service: {serviceName}</Text>
        <Text style={{marginHorizontal: 20, fontStyle: 'italic'}}>
          Marking Your Address In Map Correctly
        </Text>
        <View style={styles.markAddress}>
          <MapView ref={mapRef} style={styles.map} initialRegion={region}>
            {[
              {
                latLong: {
                  latitude: region.latitude,
                  longitude: region.longitude,
                },
                title: 'You Current Location',
                description: 'This is your location',
              },
            ].map((marker, index) => (
              <Marker.Animated
                key={index}
                coordinate={marker.latLong}
                title={marker.title}
                description={marker.description}
              />
            ))}
          </MapView>
        </View>
      </View>
      <View
        style={{
          backgroundColor: themeColors.gray,
          marginHorizontal: 20,
          marginVertical: 10,
          borderRadius: 10,
        }}>
        <Text style={styles.text}>Company Name:</Text>
        <Text style={styles.text}>Phone:</Text>
        <Text style={styles.text}>Address:</Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginHorizontal: 20,
          padding: 10,
          borderRadius: 5,
        }}>
        <Text
          style={{fontSize: 18, fontWeight: '600', color: themeColors.blue}}>
          Service Price:{' '}
        </Text>
        <Text
          style={{fontSize: 18, fontWeight: '600', color: themeColors.blue}}>
          {servicePrice}
        </Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginHorizontal: 20,
          padding: 10,
          borderRadius: 5,
          marginVertical: 10,
        }}>
        <Text
          style={{fontSize: 18, fontWeight: '600', color: themeColors.blue}}>
          Additional Price:{' '}
        </Text>
        <Text
          style={{fontSize: 18, fontWeight: '600', color: themeColors.blue}}>
          {addPrice}
        </Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginHorizontal: 20,
          backgroundColor: themeColors.blue,
          padding: 10,
          borderRadius: 5,
          marginVertical: 10,
        }}>
        <Text
          style={{fontSize: 18, fontWeight: '600', color: themeColors.white}}>
          Total Price:{' '}
        </Text>
        <Text
          style={{fontSize: 18, fontWeight: '600', color: themeColors.white}}>
          {servicePrice + addPrice}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('OTPScreen')}
        style={{
          alignSelf: 'center',
          backgroundColor: themeColors.primaryColor,
          padding: 10,
          width: 100,
          borderRadius: 10,
          marginVertical: 20,
        }}>
        <Text
          style={{
            color: themeColors.white,
            textAlign: 'center',
            fontSize: 18,
            fontWeight: 'bold',
          }}>
          Booking
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  markAddress: {
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: themeColors.blue,
    width: '90%',
    height: 150,
  },
  text: {
    marginHorizontal: 20,
    marginVertical: 8,
    fontSize: 18,
    fontWeight: '600',
    color: themeColors.blue,
  },
  map: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});
