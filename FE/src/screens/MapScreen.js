import React, {useRef} from 'react';
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
  Dimensions,
  FlatList,
} from 'react-native';
import {useEffect, useState} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import CustomMarker from '../Components/CustomMarker';
import Card from '../Components/Card';
import {themeColors} from '../theme';
import {
  useDistanceMatrixMutation,
  useReverseGeoMutation,
  useDetailPlaceMutation,
} from '../services/Map';
import {OUTER_CARD_WIDTH} from '../utils/constants';

const MapScreen = () => {
  const [loading, setLoading] = useState(true);
  const [distanceNum, setDistanceNum] = useState(50);
  const [markers, setMarkers] = React.useState([]);
  const [distanceMatrix] = useDistanceMatrixMutation();
  const [reverseGeo] = useReverseGeoMutation();
  const [detailPlace] = useDetailPlaceMutation();
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
  let _map = React.useRef(null);
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
      enableHighAccuracy: false,
      timeout: 10000,
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
        return error;
      });
    setLoading(false);
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
      distanceMatrix({
        latitude: latitude,
        longitude: longitude,
        string: string,
      })
        .unwrap()
        .then(async payload => {
          const withIndex = payload.rows[0].elements.map((val, index) => {
            const num = index + 1;
            return {index: num, ...val};
          });
          const sortedList = withIndex.sort(
            (a, b) => a.distance.value - b.distance.value,
          );
          // console.log(sortedList);
          if (distanceNum === 10) {
            const showedMarker = sortedList.filter(
              val => val.distance.value <= 10000,
            );
            // console.log('showedMarker' + showedMarker);
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
            // console.log('showedMarker' + showedMarker);
            coordinates.map(val => {
              showedMarker.map(value => {
                if (val.index === value.index) {
                  markerList.push(val);
                }
              });
            });
          } else {
            const showedMarker = [
              ...sortedList.map(val => {
                if (val.distance.value <= 50000) return val;
              }),
            ];
            coordinates.map(val => {
              showedMarker.map(value => {
                if (val.index === value.index) {
                  // console.log(val);
                  markerList.push(val);
                }
              });
            });
          }
          // console.log('markerList', markerList);
          if (!markerList.length) {
            setMarkers([]);
          } else {
            markerList.map(async val => {
              reverseGeo({latitude: val.latitude, longitude: val.longitude})
                .unwrap()
                .then(async payload => {
                  places.push(payload.results[0]);
                  if (places) {
                    let newMarkers = await Promise.all(
                      places.map(async place => {
                        let detail = {};
                        try {
                          await detailPlace({placeId: place.place_id})
                            .unwrap()
                            .then(payload => {
                              detail = payload;
                            });
                        } catch (error) {
                          console.log('err', error);
                        }
                        // console.log('detail', detail);
                        return {
                          coordinate: {
                            latitude: detail.result.geometry.location.lat,
                            longitude: detail.result.geometry.location.lng,
                          },
                          title: detail.result.name,
                          description:
                            detail.result.formatted_address || 'Not Available',
                          image: 'NA',
                        };
                      }),
                    );
                    // console.log(newMarkers);
                    setMarkers(newMarkers);
                  }
                })
                .catch(error => {
                  return error;
                });
              // places.push(JSON.stringify(reverseGeo).data.results[0]);
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      setLoading(false);
    }
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
    <View style={styles.container}>
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
      <View style={styles.outerCard}>
        <TouchableOpacity
          hitSlop={styles.hitslop}
          onPress={onPressLeft}
          style={styles.left}>
          <Image
            source={require('../../assets/images/caret-left.png')}
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
            source={require('../../assets/images/caret-right.png')}
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  map: {
    // ...StyleSheet.absoluteFillObject,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  outerCard: {
    height: 100,
    width: OUTER_CARD_WIDTH,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 450,
  },
  boxHeader: {
    height: 100,
    width: OUTER_CARD_WIDTH,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    position: 'absolute',
    top: -30,
  },
  scrollView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  hitslop: {
    top: 30,
    right: 30,
    left: 30,
    bottom: 30,
  },
  icon: {fontSize: 22, color: 'grey'},
  left: {position: 'absolute', left: 5, zIndex: 10, top: 0},
  right: {position: 'absolute', right: 5, top: 0},
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

export default MapScreen;
