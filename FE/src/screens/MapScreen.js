import React, {useRef} from 'react';
import {
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import {useEffect, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import ExploreScreen from '../screens/ExploreScreen';
const MapScreen = () => {
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
        <ActivityIndicator size={40} color="grey" />
      </View>
    );

  return (
    <View>
      <MapView ref={mapRef} style={styles.map} initialRegion={region}>
        {[
          {
            latLong: {latitude: region.latitude, longitude: region.longitude},
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
      {/* <ExploreScreen /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  map: {
    // ...StyleSheet.absoluteFillObject,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapScreen;
