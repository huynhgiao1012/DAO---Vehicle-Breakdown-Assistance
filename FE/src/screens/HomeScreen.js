import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {themeColors} from '../theme';
import MapScreen from './MapScreen';

export default function HomeScreen() {
  return (
    <ScrollView>
      <SafeAreaView forceInset={{top: 'always'}}>
        <View style={styles.bar}>
          <TouchableOpacity
            style={{
              alignSelf: 'flex-start',
            }}>
            <Image
              source={require('../../assets/icons/map.png')}
              style={{
                width: 25,
                height: 25,
                marginVertical: 10,
                alignSelf: 'center',
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: themeColors.white,
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            Nearby
          </Text>
          <TouchableOpacity
            style={{
              alignSelf: 'flex-start',
            }}>
            <Image
              source={require('../../assets/icons/info.png')}
              style={{
                width: 25,
                height: 25,
                marginVertical: 10,
                alignSelf: 'center',
              }}
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
      </SafeAreaView>
      <MapScreen />
    </ScrollView>
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
  },
  distancebar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  distancebutton: {
    backgroundColor: themeColors.gray60,
    width: 70,
    borderColor: themeColors.gray,
    borderWidth: 1,
    borderRadius: 5,
  },
  textButton: {
    color: themeColors.white,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
