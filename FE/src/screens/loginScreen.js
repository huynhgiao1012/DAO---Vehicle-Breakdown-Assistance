import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Modal,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {themeColors} from '../theme/index';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Formik} from 'formik';
import {useLoginMutation} from '../services/Auth';
import {
  clearStorage,
  getLocalStorageByKey,
  saveStorage,
} from '../common/LocalStorage';
import {KEY_TOKEN} from '../utils/constants';
import * as yup from 'yup';
import {useEffect, useState} from 'react';
import {io} from 'socket.io-client';
import jwt_decode from 'jwt-decode';
const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*`<>])(?=.{8,})/,
      'Must Contain 8 Characters, Uppercase, Lowercase, Number and Special Case Character',
    ),
});
export default function LoginScreen({route}) {
  const navigation = useNavigation();
  const [user, setUser] = useState('');
  const [socket, setSocket] = useState(null);
  const [login, {isLoading}] = useLoginMutation();
  useEffect(() => {
    // console.log('socketIo from login', route.params.socketIo);
    setSocket(route.params.socketIo);
  }, []);
  useEffect(() => {
    if (user !== '') {
      socket?.emit('newUser', user);
    }
  }, [socket, user]);
  const Login = data => {
    clearStorage(KEY_TOKEN);
    login({email: data.email, password: data.password})
      .unwrap()
      .then(payload => {
        console.log('payload', payload);
        if (payload.success === true) {
          saveStorage(KEY_TOKEN, payload.token);
          const decode = jwt_decode(payload.token);
          setUser(decode.id);
          setSocket(route.params.socketIo);
          if (payload.role === 'customer') {
            navigation.navigate('Main');
          } else {
            navigation.navigate('GarageMain');
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
      });
  };

  return (
    <View style={{backgroundColor: themeColors.primaryColor, flex: 1}}>
      {isLoading && (
        <Modal isVisible={true} transparent={true}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: '90%',
              alignSelf: 'center',
            }}>
            <ActivityIndicator size={40} color={themeColors.white} />
          </View>
        </Modal>
      )}
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
            width: 200,
            height: 200,
            marginVertical: 10,
            alignSelf: 'center',
          }}
        />
      </SafeAreaView>
      <View
        style={{
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          marginHorizontal: 30,
        }}>
        <Formik
          validationSchema={loginValidationSchema}
          onSubmit={values => Login(values)}
          initialValues={{email: '', password: ''}}>
          {({errors, handleChange, handleBlur, handleSubmit, touched}) => {
            return (
              <View>
                <View style={styles.title}>
                  <Text
                    style={{
                      color: themeColors.white,
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}>
                    Email
                  </Text>
                  {errors.email && touched.email && (
                    <Text style={styles.errorText}>*{errors.email}*</Text>
                  )}
                </View>
                <TextInput
                  style={styles.input}
                  placeholderTextColor={themeColors.white}
                  onChangeText={handleChange('email')}
                />
                <View style={styles.title}>
                  <Text
                    style={{
                      color: themeColors.white,
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}>
                    Password
                  </Text>
                  {errors.password && touched.password && (
                    <Text style={styles.errorText}>*{errors.password}*</Text>
                  )}
                </View>
                <TextInput
                  secureTextEntry
                  style={styles.input}
                  placeholderTextColor={themeColors.white}
                  onChangeText={handleChange('password')}
                />

                <TouchableOpacity
                  className="flex items-end"
                  onPress={() => navigation.navigate('ForgotPassword')}>
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
        {/* <View
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
        </View> */}
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
    color: themeColors.white,
    height: 40,
    paddingHorizontal: 10,
  },
  errorText: {
    fontSize: 12,
    color: themeColors.white,
    paddingLeft: 10,
    fontStyle: 'italic',
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
    width: '70%',
    marginTop: 10,
  },
});
