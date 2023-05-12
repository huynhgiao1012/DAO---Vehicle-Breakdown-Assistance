import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {themeColors} from '../theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

// subscribe for more videos like this :)
export default function SignUpScreen() {
  const navigation = useNavigation();
  return (
    <View style={{backgroundColor: themeColors.primaryColor, flex: 1}}>
      <SafeAreaView>
        <View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}></TouchableOpacity>
        </View>
        <View>
          <Image
            source={require('../../assets/images/logo2.png')}
            style={{
              width: 100,
              height: 100,
              marginVertical: 20,
              alignSelf: 'center',
            }}
          />
        </View>
      </SafeAreaView>
      <View
        style={{
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          backgroundColor: themeColors.white,
          flex: 1,
        }}>
        <View style={styles.form}>
          <Text style={styles.title}>Full Name</Text>
          <TextInput style={styles.input} value="" placeholder="Jonh" />
          <Text style={styles.title}>Email Address</Text>
          <TextInput style={styles.input} placeholder="example@gmail.com" />
          <Text style={styles.title}>Phone</Text>
          <TextInput style={styles.input} value="" placeholder="08320111XXX" />
          <Text style={styles.title}>Password</Text>
          <TextInput style={styles.input} secureTextEntry value="" />
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              backgroundColor: themeColors.primaryColor,
              padding: 10,
              width: '90%',
              borderRadius: 2,
              marginTop: 10,
            }}>
            <Text
              style={{
                color: themeColors.white,
                textAlign: 'center',
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: themeColors.black,
          }}>
          Or
        </Text>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection: 'row',
            marginTop: 5,
          }}>
          <TouchableOpacity style={{paddingHorizontal: 10}}>
            <Image
              source={require('../../assets/icons/google.png')}
              className="w-10 h-10"
            />
          </TouchableOpacity>
          <TouchableOpacity style={{paddingHorizontal: 10}}>
            <Image
              source={require('../../assets/icons/apple.png')}
              className="w-10 h-10"
            />
          </TouchableOpacity>
          <TouchableOpacity style={{paddingHorizontal: 10}}>
            <Image
              source={require('../../assets/icons/facebook.png')}
              className="w-10 h-10"
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection: 'row',
            marginVertical: 8,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              color: themeColors.blue,
              fontSize: 18,
            }}>
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text
              style={{
                fontWeight: 'bold',
                color: themeColors.primaryColor,
                fontSize: 18,
              }}>
              {' '}
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  form: {
    marginHorizontal: 40,
    marginVertical: 20,
  },
  title: {
    fontSize: 18,
    color: themeColors.primaryColor,
    fontWeight: '700',
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: themeColors.primaryColor2,
    marginBottom: 10,
    padding: 3,
  },
});
