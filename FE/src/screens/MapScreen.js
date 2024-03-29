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
import {
  useGetCompanyDetailMutation,
  useGetCorCompanyQuery,
} from '../services/Company';
import {useNavigation} from '@react-navigation/native';
const MapScreen = props => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [distanceNum, setDistanceNum] = useState(0);
  const [markers, setMarkers] = React.useState([]);
  const [distanceMatrix] = useDistanceMatrixMutation();
  const getCorCompany = useGetCorCompanyQuery();
  const [getCompanyDetail] = useGetCompanyDetailMutation();
  const [region, setRegion] = useState({
    latitude: 10.5369728,
    longitude: 106.6734779,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  const companyCoordinates = [];
  const mapRef = useRef(null);
  let flatlistRef = useRef(null);
  let mapIndex = useRef(0);
  let _map = React.useRef(null);
  let scrollAnimation = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    requestPermission();
  }, []);
  useEffect(() => {
    console.log('distanceNum', distanceNum);
    setMarkers([]);
    if (getCorCompany.isSuccess) {
      // console.log('data', getCorCompany.data.data);
      getCorCompany.data.data.map(val => {
        const obj = {id: val.accountId, latitude: val.lat, longitude: val.long};
        companyCoordinates.push(obj);
      });
    } else {
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color={themeColors.primaryColor} />
      </View>;
    }
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
      // console.log(granted);
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
    setMarkers([]);
    try {
      var string = '';
      let markerList = [];
      companyCoordinates.map(val => {
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
          // console.log('payload', payload.rows[0].elements);
          const withIndex = await payload.rows[0].elements.map((val, index) => {
            while (index <= companyCoordinates.length) {
              const id = companyCoordinates[index].id;
              return {id: id, ...val};
            }
          });
          const sortedList = withIndex.sort(
            (a, b) => a.distance.value - b.distance.value,
          );

          const showedMarker = [];
          sortedList.map(val => {
            if (val.distance.value <= distanceNum * 1000)
              showedMarker.push(val);
          });
          // console.log('showedMarker', showedMarker);
          companyCoordinates.map(val => {
            showedMarker.map(value => {
              if (val.id === value.id) {
                const obj = {
                  ...val,
                  distance: value.distance,
                  duration: value.duration,
                };
                markerList.push(obj);
              }
            });
          });
          // console.log('markerList', markerList);
          const sortedMarker = markerList.sort(
            (a, b) => a.distance.value - b.distance.value,
          );
          // console.log('sortedMarker', sortedMarker);
          if (!sortedMarker.length) {
            setMarkers([]);
          } else {
            let newMarkers = await Promise.all(
              sortedMarker.map(async val => {
                let detail = {};
                await getCompanyDetail({id: val.id})
                  .unwrap()
                  .then(payload => (detail = payload))
                  .catch(error => {
                    return error;
                  });
                return {
                  id: detail.data._id,
                  coordinate: {
                    latitude: detail.companyDetail.lat,
                    longitude: detail.companyDetail.long,
                  },
                  title: detail.data.name,
                  address: detail.companyDetail.address || 'Not Available',
                  image: 'NA',
                  phoneNo: detail.data.phone,
                  email: detail.data.email,
                  distance: val.distance.text,
                  openTime: detail.companyDetail.openTime,
                  closeTime: detail.companyDetail.closeTime,
                };
              }),
            );
            setMarkers(newMarkers);
            // console.log(markers);
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
  const renderCard = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('GarageDetail', {id: item.id})}>
        <Card item={item} />
      </TouchableOpacity>
    );
  };

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
        ref={_map}
        style={styles.map}
        initialRegion={region}
        onMapReady={onMapReady}
        provider={PROVIDER_GOOGLE}>
        {[
          {
            latLong: {latitude: region.latitude, longitude: region.longitude},
            title: 'Your Current Location',
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
      {/* {console.log(markers)} */}
      {!markers.length ? (
        <View></View>
      ) : (
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
      )}
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
    justifyContent: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    top: -20,
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
  left: {position: 'absolute', left: 5, zIndex: 10, top: -20},
  right: {position: 'absolute', right: 5, top: -20},
  distance: {
    backgroundColor: themeColors.primaryColor,
    borderWidth: 1,
    margin: 10,
    width: 70,
    padding: 8,
    borderRadius: 8,
    borderColor: themeColors.primaryColor,
  },
  text: {
    color: themeColors.white,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MapScreen;
