import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {themeColors} from '../theme';
import MapScreen from './MapScreen';
import ListScreen from './ListScreen';
import {useNavigation} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();
export default function HomeScreen() {
  const [isMap, setIsMap] = useState(true);
  const navigation = useNavigation();

  const setMap = () => {
    if (isMap) {
      setIsMap(false);
    } else {
      setIsMap(true);
    }
  };
  return (
    <SafeAreaView>
      <View>
        <View style={styles.bar}>
          {isMap ? (
            <TouchableOpacity
              onPress={setMap}
              style={{
                alignSelf: 'flex-start',
              }}>
              <Icon
                name="list-ul"
                size={26}
                color={themeColors.white}
                style={{marginVertical: 10}}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={setMap}
              style={{
                alignSelf: 'flex-start',
              }}>
              <Icon
                name="map"
                size={26}
                color={themeColors.white}
                style={{marginVertical: 10}}
              />
            </TouchableOpacity>
          )}
          <Text
            style={{
              color: themeColors.white,
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            Nearby
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('MyInfo')}>
            <Icon
              name="user-circle-o"
              size={26}
              color={themeColors.white}
              style={{marginVertical: 10}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.distancebar}>
          <TouchableOpacity style={styles.distancebutton}>
            <Text style={styles.textButton}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.distancebutton}>
            <Text style={styles.textButton}>10</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.distancebutton}>
            <Text style={styles.textButton}>20</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.distancebutton}>
            <Text style={styles.textButton}>30</Text>
          </TouchableOpacity>
        </View>
      </View>
      {isMap ? <MapScreen /> : <ListScreen />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: themeColors.primaryColor,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  distancebar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themeColors.primaryColor,
    paddingBottom: 10,
  },
  distancebutton: {
    backgroundColor: themeColors.primaryColor2,
    width: 70,
    borderColor: themeColors.primaryColor,
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 2,
  },
  textButton: {
    color: themeColors.white,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
