import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {themeColors} from '../theme/index';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet} from 'react-native';

export default function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{backgroundColor: themeColors.bg, flex: 1}}>
      <View>
        <Text style={styles.text1}>Let's Get Started!</Text>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.image}
        />
        <View
          style={{
            width: '100%',
            backgroundColor: themeColors.blue,
            height: '100%',
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            paddingVertical: 50,
          }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.buttonTitle}>Sign Up</Text>
          </TouchableOpacity>
          <View style={styles.group}>
            <Text style={styles.text3}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.text4}> Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  text1: {
    color: themeColors.primaryColor,
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30,
    marginVertical: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginVertical: 30,
    alignSelf: 'center',
  },
  button: {
    width: '80%',
    padding: 15,
    backgroundColor: themeColors.primaryColor,
    alignSelf: 'center',
    borderRadius: 30,
    marginHorizontal: 30,
    marginTop: 30,
  },
  buttonTitle: {
    textAlign: 'center',
    color: themeColors.white,
    fontWeight: 700,
    fontSize: 18,
  },
  group: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  text3: {
    fontSize: 16,
    color: themeColors.white,
    fontWeight: 600,
  },
  text4: {
    fontSize: 16,
    color: themeColors.primaryColor,
    fontWeight: 700,
    paddingLeft: 8,
  },
});
