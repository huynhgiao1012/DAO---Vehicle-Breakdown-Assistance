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
import Icon from 'react-native-vector-icons/FontAwesome';
import {useGetCompanyServiceMutation} from '../services/Service';
import {useState, useEffect} from 'react';
// subscribe for more videos like this :)
export default function ServiceList(props) {
  const navigation = useNavigation();
  const [getCompanyService] = useGetCompanyServiceMutation();
  const [data, setData] = useState([]);
  useEffect(() => {
    getCompanyService({id: props.id})
      .unwrap()
      .then(payload => {
        console.log(payload);
        setData([...payload.data]);
        console.log('data', data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  return (
    <FlatList
      horizontal={true}
      style={{marginHorizontal: 20}}
      ItemSeparatorComponent={
        Platform.OS !== 'android' &&
        (({highlighted}) => (
          <View style={[styles.separator, highlighted && {marginLeft: 0}]} />
        ))
      }
      data={data}
      renderItem={({item, index, separators}) => (
        <TouchableOpacity
          key={item._id}
          onPress={() =>
            navigation.navigate('BookingScreen', {
              id: item._id,
              accountId: item.accountId,
              serviceName: item.type,
              servicePrice: item.price,
            })
          }>
          <View
            style={{
              width: 100,
              height: 100,
              paddingHorizontal: 3,
              paddingVertical: 10,
              borderWidth: 1,
              borderColor: themeColors.primaryColor,
              backgroundColor: themeColors.primaryColor,
              marginVertical: 5,
              borderRadius: 20,
              marginRight: 10,
            }}>
            <Icon
              name="wrench"
              size={30}
              color={themeColors.blue}
              style={{alignSelf: 'center'}}
            />
            <Text
              style={{
                paddingVertical: 5,
                fontWeight: '900',
                fontSize: 14,
                color: themeColors.blue,
                textAlign: 'center',
              }}>
              {item.type}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: themeColors.white,
                textAlign: 'center',
                paddingBottom: 10,
                fontWeight: '600',
              }}>
              {item.price}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  item: {
    backgroundColor: themeColors.white,
  },
});
