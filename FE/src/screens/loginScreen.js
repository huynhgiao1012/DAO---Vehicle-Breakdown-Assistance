import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {themeColors} from '../theme/index';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Formik} from 'formik';
import {useLoginMutation} from '../services/Auth';
import {getLocalStorageByKey, saveStorage} from '../common/LocalStorage';
import {KEY_TOKEN} from '../utils/constants';
export default function LoginScreen() {
  const navigation = useNavigation();
  const [login] = useLoginMutation();
  const Login = data => {
    login({email: data.email, password: data.password})
      .unwrap()
      .then(async payload => {
        if (payload.success === true) {
          saveStorage(KEY_TOKEN, payload.token);
          const token = await getLocalStorageByKey(KEY_TOKEN);
          if (token) {
            navigation.navigate('Main');
          }
        } else {
          if (payload.customerId.isActive === false) {
            Alert.alert(
              'Your account have not been verified',
              payload.message,
              [
                {
                  text: 'OK',
                  onPress: () =>
                    navigation.navigate('OTPScreen', {
                      id: payload.customerId._id,
                    }),
                },
              ],
            );
          }
        }
      })
      .catch(error => {
        console.log(error);
        // if (error) {
        //   Alert.alert('Notification', error.data.message.duplicate, [
        //     {text: 'OK', onPress: () => console.log('OK Pressed')},
        //   ]);
        // }
      });
  };

  return (
    <View style={{backgroundColor: themeColors.primaryColor, flex: 1}}>
      <SafeAreaView>
        <View
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name="arrow-left"
              size={26}
              color={themeColors.white}
              style={{marginVertical: 10, marginHorizontal: 20}}
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
        <Formik
          onSubmit={values => Login(values)}
          initialValues={{email: '', password: ''}}>
          {({errors, handleChange, handleBlur, handleSubmit, values}) => {
            return (
              <View>
                <TextInput
                  placeholder="Email"
                  style={styles.input}
                  placeholderTextColor={themeColors.white}
                  onChangeText={handleChange('email')}
                />
                <TextInput
                  secureTextEntry
                  placeholder="Password"
                  style={styles.input}
                  placeholderTextColor={themeColors.white}
                  onChangeText={handleChange('password')}
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
                  onPress={handleSubmit}
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
            );
          }}
        </Formik>
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
