import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import Header from '../../Components/Header';
import React, {useState, useEffect, useRef} from 'react';
import {createOpenLink} from 'react-native-open-maps';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  enableLatestRenderer,
  Polyline,
} from 'react-native-maps';
import polyline from '@mapbox/polyline';
import decodePolyline from 'decode-google-map-polyline';
import GetLocation from 'react-native-get-location';
import {
  useDirectionPathMutation,
  useForwardGeoMutation,
} from '../../services/Map';
import {useGetSpecificCorCompanyQuery} from '../../services/Company';
import {themeColors} from '../../theme';
import {TouchableOpacity} from 'react-native-gesture-handler';

enableLatestRenderer();
export default function ViewPathScreen({route}) {
  const {address} = route.params;
  const [forwardGeo] = useForwardGeoMutation();
  const [destinations, setDes] = useState({lat: '', lng: ''});
  const [origins, setOrigins] = useState({lat: '', lng: ''});
  const getSpecificCorCompany = useGetSpecificCorCompanyQuery();
  const [directionPath] = useDirectionPathMutation();
  const [newCordinates, setNewCoordinates] = useState([]);

  useEffect(() => {
    const string = address.split(' ').join('%20');
    if (getSpecificCorCompany.isLoading === false) {
      const obj = {
        lat: getSpecificCorCompany.data.data.lat,
        lng: getSpecificCorCompany.data.data.long,
      };
      setOrigins(prev => ({...prev, ...obj}));
    }
    forwardGeo({address: string})
      .unwrap()
      .then(payload => {
        const destinations = {
          lat: payload.results[0].geometry.location.lat,
          lng: payload.results[0].geometry.location.lng,
        };
        setDes(prev => ({...prev, ...destinations}));
      });
  }, []);
  useEffect(() => {
    console.log('hihi');
    console.log('origins', origins);
    console.log('destinations', destinations);
    if (getSpecificCorCompany.isSuccess === true) {
      console.log(getSpecificCorCompany);
      const obj = {
        lat: getSpecificCorCompany.data.data.lat,
        lng: getSpecificCorCompany.data.data.long,
      };
      setOrigins(prev => ({...prev, ...obj}));
      directionPath({origins: obj, destinations: destinations})
        .unwrap()
        .then(payload => {
          if (payload) {
            const coordinates = decodePolyline(
              payload.routes[0].overview_polyline.points,
            );
            const newArr = coordinates.map(val => {
              const obj = {latitude: val.lat, longitude: val.lng};
              return obj;
            });
            setNewCoordinates(prev => [...prev, ...newArr]);
          }
        })
        .catch(error => console.log(error));
    }
  }, [destinations]);

  return getSpecificCorCompany.isLoading === true &&
    !getSpecificCorCompany.data ? (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <ActivityIndicator size="large" color={themeColors.primaryColor} />
    </View>
  ) : (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: origins && origins.lat,
          longitude: origins && origins.lng,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        <Marker
          draggable
          coordinate={{
            latitude: origins && origins.lat,
            longitude: origins && origins.lng,
          }}
          title="Your Current Place"
          description="This is your current place"></Marker>

        <Polyline
          coordinates={newCordinates}
          strokeWidth={5}
          strokeColor={themeColors.primaryColor}
        />
      </MapView>
      <View style={{position: 'absolute', bottom: 20, right: 20}}>
        <TouchableOpacity
          onPress={createOpenLink({
            provider: 'google',
            start: `${getSpecificCorCompany.data.data.address}`,
            end: `${address}`,
          })}
          style={{backgroundColor: themeColors.blue, padding: 15}}>
          <Text style={{color: themeColors.white, fontWeight: 'bold'}}>
            Open Google Map
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
    marginBottom: -15,
  },
  //   Character name
  name: {
    fontSize: 11,
    marginBottom: 5,
    color: 'black',
  },
});
