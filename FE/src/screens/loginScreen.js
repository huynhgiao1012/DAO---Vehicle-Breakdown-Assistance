import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {themeColors} from '../theme/index';
import {useNavigation} from '@react-navigation/native';

export default function LoginScreen() {
  const navigation = useNavigation();
  return (
    <View style={{backgroundColor: themeColors.primaryColor, flex: 1}}>
      <SafeAreaView>
        <View
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../assets/images/arrow.png')}
              style={{
                width: 30,
                height: 30,
                marginLeft: 20,
                marginTop: 20,
              }}
            />
          </TouchableOpacity>
        </View>
        <Image
          source={require('../../assets/images/logo2.png')}
          style={{
            width: 250,
            height: 250,
            marginVertical: 20,
            alignSelf: 'center',
          }}
        />
      </SafeAreaView>
      <View
        style={{
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          marginHorizontal: 40,
        }}>
        <View>
          <TextInput
            placeholder="Email"
            value=""
            style={styles.input}
            placeholderTextColor={themeColors.white}
          />
          <TextInput
            secureTextEntry
            placeholder="Password"
            value=""
            style={styles.input}
            placeholderTextColor={themeColors.white}
          />
          <TouchableOpacity className="flex items-end">
            <Text
              style={{
                alignSelf: 'flex-end',
                padding: 10,
                color: themeColors.white,
                fontStyle: 'italic',
              }}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              backgroundColor: themeColors.blue,
              padding: 15,
              width: '80%',
              borderRadius: 30,
            }}>
            <Text
              style={{
                color: themeColors.white,
                textAlign: 'center',
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            textAlign: 'center',
            marginVertical: 10,
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
          <Text>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text
              style={{
                fontWeight: 'bold',
                color: themeColors.white,
              }}>
              {' '}
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 2,
    borderBottomColor: themeColors.white,
    fontSize: 16,
    color: themeColors.blue,
  },
});
