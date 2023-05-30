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
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import GetLocation from 'react-native-get-location';
const MapScreen = () => {
  const [loading, setLoading] = useState(true);
  const [distanceNum, setDistanceNum] = useState(50);
  const [markers, setMarkers] = React.useState([]);
  const [region, setRegion] = useState({
    latitude: 10.5369728,
    longitude: 106.6734779,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  const coordinates = [
    {index: 1, latitude: 10.5272726, longitude: 106.6644055},
    {index: 2, latitude: 10.5445635, longitude: 106.5034389},
    {index: 3, latitude: 10.5580642, longitude: 106.4835262},
    {index: 4, latitude: 10.5347751, longitude: 106.4622402},
    {index: 5, latitude: 10.5600893, longitude: 106.4900494},
    {index: 6, latitude: 10.6021061, longitude: 106.5375996},
    {index: 7, latitude: 10.6323496, longitude: 106.5415478},
    {index: 8, latitude: 10.6389294, longitude: 106.5670395},
    {index: 9, latitude: 10.6145076, longitude: 106.6314983},
  ];
  const mapRef = useRef(null);
  let flatlistRef = useRef(null);
  let mapIndex = useRef(0);
  let scrollAnimation = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    requestPermission();
  }, []);
  useEffect(() => {
    console.log('change');
    getCurrentLocation();
  }, [distanceNum]);
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
  const onMarkerPress = ({
    _targetInst: {
      return: {key: markerID},
    },
  }) => {
    // In this case we dont need to animate to region, it happens by default
    mapIndex.current = markerID;
    flatlistRef.current?.scrollToIndex({index: markerID, animate: true});
  };

  const onPressLeft = () => {
    if (!mapIndex.current || mapIndex.current < 0) return;
    let newIndex = parseInt(mapIndex.current) - 1;
    flatlistRef.current?.scrollToIndex({index: newIndex, animate: true});
  };

  const onPressRight = () => {
    if (mapIndex.current >= markers.length - 1) return;
    let newIndex = parseInt(mapIndex.current) + 1;
    flatlistRef.current?.scrollToIndex({index: newIndex, animate: true});
  };

  const onScroll = event => {
    let xDistance = event.nativeEvent.contentOffset.x;
    if (xDistance % OUTER_CARD_WIDTH == 0) {
      // When scroll ends
      let index = xDistance / OUTER_CARD_WIDTH;
      if (mapIndex.current == index) return;
      console.log('scroll end reached');
      mapIndex.current = index;
      const coordinate = markers[index] && markers[index].coordinate;
      setTimeout(
        () =>
          _map.current?.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: region.latitudeDelta,
              longitudeDelta: region.longitudeDelta,
            },
            350,
          ),
        10,
      );
    }
  };
  const renderCard = ({item}) => <Card item={item} />;

  const renderMarker = (item, index) => (
    <CustomMarker
      key={index}
      index={index}
      marker={item}
      scrollAnimation={scrollAnimation}
      onMarkerPress={onMarkerPress}
    />
  );
  return (
    <View>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={region}
        onMapReady={onMapReady}
        provider={PROVIDER_GOOGLE}>
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
        {markers.map(renderMarker)}
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
