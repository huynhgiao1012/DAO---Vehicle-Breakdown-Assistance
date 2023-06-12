import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useRef} from 'react';
import Header from '../Components/Header';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {themeColors} from '../theme';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {useGetUserDetailQuery} from '../services/User';
import MapView, {Marker} from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import {useReverseGeoMutation} from '../services/Map';
import {useGetCompanyDetailMutation} from '../services/Company';
import socketService from '../utils/socketService';
import {io} from 'socket.io-client';

export default function BookingScreen({route}) {
  const navigation = useNavigation();
  const userData = useGetUserDetailQuery();
  const [companyDetail] = useGetCompanyDetailMutation();
  const [reverseGeo] = useReverseGeoMutation();
  const [addPrice, setAddPrice] = useState(20);
  const {id, accountId, serviceName, servicePrice} = route.params;
  const {socketIo} = route.params;
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);

  const [region, setRegion] = useState({
    latitude: 10.5369728,
    longitude: 106.6734779,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  const [data, setData] = useState({
    companyDetail: {
      __v: 0,
      _id: '',
      accountId: '',
      address: '',
      closeTime: '',
      createAt: '',
      createdAt: '',
      lat: 0,
      long: 0,
      openTime: '',
      updatedAt: '',
    },
    data: {
      __v: 0,
      _id: '',
      createdAt: '',
      email: '',
      isActive: false,
      name: '',
      password: '',
      phone: '',
      role: '',
      updatedAt: '',
    },
    success: true,
  });
  useEffect(() => {
    companyDetail({id: accountId})
      .unwrap()
      .then(payload => {
        setData(data => ({
          ...data,
          ...payload,
        }));
      })
      .catch(error => {
        return error;
      });
    setSocket(socketIo);
  }, []);
  const mapRef = useRef(null);

  useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    if (loading) return;
    mapRef.current?.animateToRegion(region);
    reverseGeo({latitude: region.latitude, longitude: region.longitude})
      .then(payload => setAddress(payload.data.results[0].formatted_address))
      .catch(error => {
        return error;
      });
  }, [region]);
  const handleBook = () => {
    socket.emit('sendNotification', {
      senderName: userData.currentData.data._id,
      receiverName: data.data._id,
      text: `${userData.currentData.data.name} has booked your service`,
    });
    console.log(socket);
  };
  const requestPermission = async () => {
    if (Platform.OS == 'android') {
      getCurrentLocation();
      reverseGeo({latitude: region.latitude, longitude: region.longitude})
        .then(payload => setAddress(payload.data.results[0].formatted_address))
        .catch(error => {
          return error;
        });
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
    <ScrollView style={{backgroundColor: themeColors.white}}>
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
        <View
          style={{
            marginHorizontal: 20,
            borderRadius: 10,
            paddingVertical: 10,
          }}>
          <Text style={styles.text1}>Customer's Name</Text>
          <Text style={styles.text2}>
            {userData.data ? userData.currentData.data.name : ''}
          </Text>
          <Text style={styles.text1}>Customer's Phone</Text>
          <Text style={styles.text2}>
            {userData.data ? userData.currentData.data.phone : ''}
          </Text>
          <Text style={styles.text1}>Customer's Address</Text>
          <Text style={styles.text2}>{address}</Text>
        </View>
        <Text
          style={{marginHorizontal: 20, fontStyle: 'italic', marginBottom: 5}}>
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
                title: 'Your Current Location',
              },
            ].map((marker, index) => (
              <Marker.Animated
                key={index}
                draggable
                onDragEnd={e => {
                  console.log('dragEnd', e.nativeEvent.coordinate);
                  setRegion({
                    latitude: e.nativeEvent.coordinate.latitude,
                    longitude: e.nativeEvent.coordinate.longitude,
                  });
                }}
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
          marginHorizontal: 20,
          marginVertical: 10,
          borderRadius: 10,
          paddingVertical: 10,
        }}>
        <Text style={styles.text1}>Garage's Name</Text>
        <Text style={styles.text2}>{data ? data.data.name : ''}</Text>
        <Text style={styles.text1}>Garage's Phone</Text>
        <Text style={styles.text2}>{data ? data.data.phone : ''}</Text>
        <Text style={styles.text1}>Garage's Address</Text>
        <Text style={styles.text2}>
          {data ? data.companyDetail.address : ''}
        </Text>
        <Text style={styles.text1}>Service</Text>
        <Text style={styles.text2}>{serviceName}</Text>
        <Text style={styles.text1}>Date</Text>
        <Text style={styles.text2}>{new Date().toLocaleDateString()}</Text>
        <Text style={styles.text1}>Other Notes</Text>
        <TextInput
          numberOfLines={1}
          placeholder="Optional"
          style={{
            borderWidth: 1,
            borderColor: themeColors.primaryColor2,
            paddingHorizontal: 10,
            borderRadius: 10,
            fontSize: 16,
            color: themeColors.blue,
          }}></TextInput>
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
        onPress={handleBook}
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
    borderColor: themeColors.primaryColor,
    width: '90%',
    height: 250,
    alignSelf: 'center',
  },
  text: {
    marginHorizontal: 10,
    marginVertical: 8,
    fontSize: 18,
    fontWeight: '600',
    color: themeColors.blue,
  },
  text1: {
    marginVertical: 8,
    fontSize: 18,
    fontWeight: '800',
    color: themeColors.primaryColor,
  },
  text2: {
    fontSize: 16,
    fontWeight: '600',
    color: themeColors.blue,
    borderColor: themeColors.primaryColor2,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  map: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});
