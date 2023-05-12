import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import axios from 'axios';
import Card from '../Components/Card';
import CustomMarker from '../Components/CustomMarker';
import GetLocation from 'react-native-get-location';
import {OUTER_CARD_WIDTH} from '../utils/constants';

const ExploreScreen = () => {
  const [loading, setLoading] = useState(true);
  const [distanceNum, setDistanceNum] = useState(50);
  const [markers, setMarkers] = React.useState([]);
  const [region, setRegion] = useState({
    latitude: 10.5369728,
    longitude: 106.6734779,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  const API_KEY = '9Icy3mrshOwEqiL7fX9e8dV8rza1aX340AMpGMyV';
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
  let _map = React.useRef(null);
  let flatlistRef = React.useRef(null);
  let mapIndex = useRef(0);
  let scrollAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    requestPermission();
  }, []);
  useEffect(() => {
    console.log('change');
    getCurrentLocation();
  }, [distanceNum]);
  const requestPermission = async () => {
    if (Platform.OS == 'android') {
      getCurrentLocation();
    } else {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) getCurrentLocation();
      else {
        setLoading(false);
        alert('Permission Denied');
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
        apiCall(location.latitude, location.longitude);
      })
      .catch(error => {
        const {code, message} = error;
      });
  };

  const apiCall = async (latitude, longitude) => {
    try {
      var string = '';
      let markerList = [];
      let places = [];
      coordinates.map(val => {
        if (string.length === 0) {
          string = val.latitude + ',' + val.longitude;
        } else {
          string = string + '%7C' + val.latitude + ',' + val.longitude;
        }
      });
      const distanceMatrix = await axios.get(
        `https://rsapi.goong.io/DistanceMatrix?origins=${latitude},${longitude}&destinations=${string}&vehicle=truck&api_key=${API_KEY}`,
      );
      const withIndex = distanceMatrix.data.rows[0].elements.map(
        (val, index) => {
          const num = index + 1;
          return {index: num, ...val};
        },
      );
      const sortedList = withIndex.sort(
        (a, b) => a.distance.value - b.distance.value,
      );
      if (distanceNum === 10) {
        const showedMarker = sortedList.filter(
          val => val.distance.value <= 10000,
        );
        coordinates.map(val => {
          showedMarker.map(value => {
            if (val.index === value.index) {
              markerList.push(val);
            }
          });
        });
      } else if (distanceNum === 100) {
        const showedMarker = sortedList.filter(
          val => val.distance.value <= 100000,
        );
        coordinates.map(val => {
          showedMarker.map(value => {
            if (val.index === value.index) {
              markerList.push(val);
            }
          });
        });
      } else {
        const showedMarker = sortedList.filter(
          val => val.distance.value <= 50000,
        );
        coordinates.map(val => {
          showedMarker.map(value => {
            if (val.index === value.index) {
              markerList.push(val);
            }
          });
        });
      }
      console.log(markerList);
      if (!markerList.length) {
        setMarkers([]);
      } else {
        markerList.map(async val => {
          const reverseGeo = await axios.get(
            `https://rsapi.goong.io/Geocode?latlng=${val.latitude},%20${val.longitude}&api_key=${API_KEY}`,
          );
          places.push(reverseGeo.data.results[0]);
          if (places) {
            let newMarkers = await Promise.all(
              places.map(async place => {
                let details = {};
                try {
                  details = await axios.get(
                    `https://rsapi.goong.io/Place/Detail?place_id=${place.place_id}&api_key=${API_KEY}`,
                  );
                } catch (error) {
                  console.log('err', error);
                }
                return {
                  coordinate: {
                    latitude: details.data.result.geometry.location.lat,
                    longitude: details.data.result.geometry.location.lng,
                  },
                  title: details.data.result.name,
                  description:
                    details.data.result.formatted_address || 'Not Available',
                  image: 'NA',
                };
              }),
            );
            setMarkers(newMarkers);
          }
        });
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const onMapReady = () => {
    if (!markers.length) return;
    setTimeout(() => {
      _map.current.animateToRegion({
        ...(markers[0] ? markers[0].coordinate : region),
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta,
      });
    }, 10);
  };

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
  if (loading)
    return (
      <View style={styles.loadContainer}>
        <ActivityIndicator size={55} color="grey" />
      </View>
    );

  return (
    <View style={styles.container}>
      <MapView
        ref={_map}
        onMapReady={onMapReady}
        initialRegion={region}
        style={styles.container}
        provider={PROVIDER_GOOGLE}>
        {markers.map(renderMarker)}
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
            setDistanceNum(50);
          }}
          style={styles.distance}>
          <Text style={styles.text}>50 km</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setDistanceNum(100);
          }}
          style={styles.distance}>
          <Text style={styles.text}>100 km</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.outerCard}>
        <TouchableOpacity
          hitSlop={styles.hitslop}
          onPress={onPressLeft}
          style={styles.left}>
          <Image
            source={require('../../assets/icons/caret-left.png')}
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
        <Animated.FlatList
          initialNumToRender={markers.length}
          ref={flatlistRef}
          horizontal
          pagingEnabled
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={OUTER_CARD_WIDTH}
          snapToAlignment="center"
          keyExtractor={(item, index) => index.toString()}
          style={styles.scrollView}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: scrollAnimation,
                  },
                },
              },
            ],
            {useNativeDriver: true, listener: onScroll},
          )}
          data={markers}
          renderItem={renderCard}
        />
        <TouchableOpacity
          hitSlop={styles.hitslop}
          onPress={onPressRight}
          style={styles.right}>
          <Image
            source={require('../../assets/icons/caret-left.png')}
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  loadContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    ...StyleSheet.absoluteFill,
  },
  scrollView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  outerCard: {
    height: 160,
    width: OUTER_CARD_WIDTH,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
  },
  boxHeader: {
    height: 160,
    width: OUTER_CARD_WIDTH,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    position: 'absolute',
    top: -30,
  },
  hitslop: {
    top: 30,
    right: 30,
    left: 30,
    bottom: 30,
  },
  icon: {fontSize: 22, color: 'grey'},
  left: {position: 'absolute', left: 5, zIndex: 10},
  right: {position: 'absolute', right: 5},
  distance: {
    backgroundColor: 'white',
    borderWidth: 1,
    margin: 10,
    width: 70,
    padding: 8,
    borderRadius: 8,
    borderColor: '#c8c8c8',
  },
  text: {
    color: 'black',
    textAlign: 'center',
  },
});
