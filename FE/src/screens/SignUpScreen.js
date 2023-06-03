import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {Formik} from 'formik';
import {themeColors} from '../theme';
import {useNavigation} from '@react-navigation/native';
import {useRegisterMutation} from '../services/Auth';
import * as yup from 'yup';
const signUpValidationSchema = yup.object().shape({
  name: yup.string().required('Name is Required'),
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: yup
    .string()
    .required('Password is Required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain 8 Characters, Uppercase, Lowercase, Number and Special Case Character',
    ),
  phone: yup
    .string()
    .required('Phone is required')
    .matches(/^(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Must be a valid phone'),
});
// subscribe for more videos like this :)
export default function SignUpScreen() {
  const navigation = useNavigation();
  const [registerQuery, {isLoading}] = useRegisterMutation();
  const Register = data => {
    registerQuery(data)
      .then(payload => {
        console.log('payload', payload);
        if (payload) {
          Alert.alert(
            payload.message,
            'Please verify your account before login!',
            [
              {
                text: 'OK',
                onPress: () =>
                  navigation.navigate('OTPScreen', {id: payload.data.data._id}),
              },
            ],
          );
        }
      })
      .catch(error => {
        console.log('error', error);
        if (error) {
          Alert.alert('Notification', error.data.message.duplicate, [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
        }
      });
  };
  return (
    <View style={{backgroundColor: themeColors.primaryColor, flex: 1}}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={styles.circle}></View>
        <View style={styles.circle}></View>
        <View style={styles.circle}></View>
      </View>
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
            <ActivityIndicator size={40} color={themeColors.primaryColor} />
          </View>
        </Modal>
      )}

      <View
        style={{
          backgroundColor: themeColors.white,
          flex: 1,
          marginHorizontal: 10,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}>
        <Formik
          validationSchema={signUpValidationSchema}
          onSubmit={values => Register(values)}
          initialValues={{name: '', email: '', phone: '', password: ''}}>
          {({errors, handleChange, handleSubmit, touched}) => {
            return (
              <View style={styles.form}>
                <View style={styles.titleText}>
                  <Text style={styles.title}>Full Name</Text>
                  {errors.name && touched.name && (
                    <Text style={styles.errorText}>* {errors.name} *</Text>
                  )}
                </View>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('name')}
                />
                <View style={styles.titleText}>
                  <Text style={styles.title}>Email Address</Text>
                  {errors.email && touched.email && (
                    <Text style={styles.errorText}>* {errors.email} *</Text>
                  )}
                </View>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('email')}
                />
                <View style={styles.titleText}>
                  <Text style={styles.title}>Phone</Text>
                  {errors.phone && touched.phone && (
                    <Text style={styles.errorText}>* {errors.phone} *</Text>
                  )}
                </View>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('phone')}
                />
                <View style={styles.titleText}>
                  <Text style={styles.title}>Password</Text>
                  {errors.password && touched.password && (
                    <Text style={styles.errorText}>* {errors.password} *</Text>
                  )}
                </View>

                <TextInput
                  style={styles.input}
                  secureTextEntry
                  onChangeText={handleChange('password')}
                />
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={{
                    alignSelf: 'center',
                    backgroundColor: themeColors.primaryColor,
                    padding: 10,
                    width: '90%',
                    borderRadius: 2,
                    marginTop: 30,
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
            );
          }}
        </Formik>
        {/* <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: themeColors.black,
          }}>
          Or
        </Text> */}
        {/* <View
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
        </View> */}
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
  circle: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: themeColors.white,
    marginVertical: 20,
    marginHorizontal: 20,
  },
  form: {
    marginHorizontal: 30,
    marginVertical: 40,
  },
  title: {
    fontSize: 16,
    color: themeColors.primaryColor,
    fontWeight: '700',
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: themeColors.primaryColor2,
    marginBottom: 10,
    padding: 3,
  },
  errorText: {
    fontSize: 13,
    color: 'red',
    paddingLeft: 10,
    fontStyle: 'italic',
  },
  titleText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
    width: '70%',
    marginTop: 10,
  },
});
