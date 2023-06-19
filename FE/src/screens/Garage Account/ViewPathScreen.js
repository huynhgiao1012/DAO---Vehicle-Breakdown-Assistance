import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import Header from '../../Components/Header';
import React, {useState, useEffect, useRef} from 'react';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
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

enableLatestRenderer();
export default function ViewPathScreen({route}) {
  const [loading, setLoading] = useState(true);
  const {address} = route.params;
  const [forwardGeo] = useForwardGeoMutation();
  //   const [destinations, setDes] = useState({lat: '', lng: ''});
  //   const [origins, setOrigins] = useState({lat: '', lng: ''});
  const getSpecificCorCompany = useGetSpecificCorCompanyQuery();
  const [directionPath] = useDirectionPathMutation();
  const [region, setRegion] = useState({
    latitude: 10.5369728,
    longitude: 106.6734779,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  const mapRef = useRef(null);

  useEffect(() => {
    const string = address.split(' ').join('%20');
    forwardGeo({address: string})
      .unwrap()
      .then(payload => {
        const destinations = {
          lat: payload.results[0].geometry.location.lat,
          lng: payload.results[0].geometry.location.lng,
        };
        const origins = {lat: '', lng: ''};
        if (!getSpecificCorCompany.isLoading) {
          origins.lat = getSpecificCorCompany.data.data.lat;
          origins.lng = getSpecificCorCompany.data.data.long;
        }
        directionPath({origins: origins, destinations: destinations})
          .unwrap()
          .then(payload => {
            console.log(payload.routes[0].overview_polyline.points);
          });
      });
  }, []);
  useEffect(() => {
    directionPath({origins: origins, destinations: destinations})
      .unwrap()
      .then(payload => {
        console.log(payload.routes[0].overview_polyline.points);
      });
  }, [origins]);
  //   useEffect(() => {
  //     if (loading) return;
  //     mapRef.current?.animateToRegion(region);
  //   }, [region]);

  //   const requestPermission = async () => {
  //     if (Platform.OS == 'android') {
  //       getCurrentLocation();
  //     } else {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       );
  //       console.log(granted);
  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) getCurrentLocation();
  //       else {
  //         alert('notGranted');
  //       }
  //     }
  //   };

  //   const getCurrentLocation = () => {
  //     GetLocation.getCurrentPosition({
  //       enableHighAccuracy: true,
  //       timeout: 20000,
  //     })
  //       .then(location => {
  //         setRegion({
  //           ...region,
  //           latitude: location.latitude,
  //           longitude: location.longitude,
  //         });
  //       })
  //       .catch(error => {
  //         const {code, message} = error;
  //         console.warn(code, message);
  //       });
  //     setLoading(false);
  //   };

  //   if (loading)
  //     return (
  //       <View style={styles.container}>
  //         <ActivityIndicator size={55} color="grey" />
  //       </View>
  //     );

  //   const coordinates = polyline.decode('mtm_C{cudSG@');
  //   console.log('coordinates', coordinates);
  //   const coordinates = decodePolyline(
  //     '}cv`Ae_hjSNEBFuAh@EHB\\BDRL@B?@?@@@@B@?@@B@@?@?B?@?@ABA@A@A?A@A?C?A?A?CAAFKHI|Aq@NMDOn@[vAo@NG\\M|G{BVIbA_@`A[rFmBf@QlAa@VMFIf@aAlAeCb@_ATc@b@}@dAwBVi@n@qAHSVe@Vk@LUlAeCvBgEfBuDr@uAN]\\o@dCuFXw@Tm@p@gBXo@Ve@RYfBkC~EmHd@q@rFmI|@uAnBuCLKFGx@iA`@o@DM`@o@BIBKFWJk@@c@EIUq@Y_AQ}@G[Gc@MmACk@Cw@GqCCO??@GLQLQXUF?dAEv@C`ACvCKxAE|@EjEOpAGzBI^E|AKTAz@GrAMl@Gn@ETCvAMpAKJX',
  //   );
  //   const newCordinates = [];
  //   for (let data of coordinates) {
  //     console.log(data);
  //     newCordinates.push({latitude: data[0], longitude: data[1]});
  //   }
  //   console.log('newCordinates', newCordinates);

  // const coordinates = [
  //   {latitude: 10.7681832, longitude: 106.7060151},
  //   {latitude: 10.76246, longitude: 106.70838},
  //   {latitude: 10.75702, longitude: 106.71797},
  //   {latitude: 10.75184, longitude: 106.72482},
  //   {latitude: 10.75248, longitude: 106.72661},
  //   {latitude: 10.75263, longitude: 106.728},
  //   {latitude: 10.75238, longitude: 106.7284},
  //   {latitude: 10.74475, longitude: 106.72915},
  // ];

  // geocoding - dung api chuyen dia chi cu the ra toa do - sau do bo toa do vo api direction
  // - lay cai chuoi dem di decode - convert qua dung dang - roi lay array toa do bo vo polyline de render ra duong di

  return (
    <View style={{flex: 1}}>
      <MapView style={styles.map} initialRegion={region}>
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
    </View>
    // <View style={styles.container}>
    //   <MapView
    //     provider={PROVIDER_GOOGLE} // remove if not using Google Maps
    //     style={styles.map}
    //     region={{
    //       latitude: 10.5369798,
    //       longitude: 106.6734728,
    //       latitudeDelta: 0.015,
    //       longitudeDelta: 0.0121,
    //     }}>
    //     <Marker
    //       draggable
    //       coordinate={{
    //         latitude: 10.5369798,
    //         longitude: 106.6734728,
    //       }}
    //       title="Ben Thanh Market"
    //       description="This is Ben Thanh Market"></Marker>
    //     {/* <Polyline
    //       coordinates={newCordinates}
    //       strokeWidth={3}
    //       strokeColor={'green'}
    //     /> */}
    //   </MapView>
    // </View>
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
