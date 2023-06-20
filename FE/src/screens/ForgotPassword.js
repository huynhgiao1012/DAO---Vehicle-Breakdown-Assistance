import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Header from '../Components/Header';
import {themeColors} from '../theme';
import {TextInput} from 'react-native-gesture-handler';
import {Formik} from 'formik';
import * as yup from 'yup';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useForgetPasswordMutation} from '../services/Auth';

const forgotPasswordValidationSchema = yup.object().shape({
  email: yup.string().required('Email is required'),
});
export default function ForgotPassword() {
  const navigation = useNavigation();
  const [forgetPassword] = useForgetPasswordMutation();
  const forgetPass = val => {
    forgetPassword({...val})
      .unwrap()
      .then(payload => {
        console.log(payload);
        if (payload) {
          Alert.alert('Notification', payload.message, [
            {
              text: 'OK',
            },
          ]);
        }
        navigation.navigate('Welcome');
      })
      .catch(error => {
        if (error) {
          Alert.alert('Change Password Failed', error.data.message, [
            {
              text: 'OK',
            },
          ]);
        }
      });
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fffaf0'}}>
      <View
        style={{
          width: 450,
          height: 200,
          backgroundColor: themeColors.gray,
          transform: [{rotate: '25deg'}],
          position: 'absolute',
          top: -70,
          right: -50,
          borderBottomRightRadius: 150,
        }}></View>
      <Header />
      <View style={{marginVertical: 100}}>
        <Formik
          validationSchema={forgotPasswordValidationSchema}
          onSubmit={values => forgetPass(values)}
          initialValues={{email: ''}}>
          {({errors, handleChange, handleSubmit, touched}) => {
            return (
              <View
                style={{
                  marginHorizontal: 30,
                  backgroundColor: themeColors.white,
                  padding: 20,
                  borderRadius: 10,
                  borderColor: themeColors.primaryColor2,
                  borderWidth: 1,
                }}>
                <Text
                  style={{
                    color: themeColors.primaryColor,
                    fontSize: 20,
                    fontWeight: '800',
                    marginBottom: 10,
                  }}>
                  Forgot Password ?
                </Text>
                <TextInput
                  onChangeText={handleChange('email')}
                  style={{
                    backgroundColor: '#fffaf0',
                    paddingHorizontal: 10,
                    fontSize: 16,
                    fontWeight: '600',
                    color: themeColors.blue,
                    borderRadius: 10,
                  }}
                />
                {errors.email && touched.email && (
                  <Text style={styles.errorText}>*{errors.email}*</Text>
                )}

                <TouchableOpacity
                  onPress={handleSubmit}
                  style={{
                    alignSelf: 'center',
                    padding: 8,
                    width: '70%',
                    borderRadius: 10,
                    marginTop: 20,
                    borderWidth: 1,
                    borderColor: themeColors.blue,
                  }}>
                  <Text
                    style={{
                      color: themeColors.blue,
                      textAlign: 'center',
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}>
                    Send Mail
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </Formik>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'baseline',
        }}>
        <View
          style={{
            backgroundColor: themeColors.primaryColor,
            borderTopRightRadius: 300,
            width: 350,
            height: 300,
          }}></View>

        <View
          style={{
            backgroundColor: themeColors.primaryColor2,
            borderTopLeftRadius: 300,
            width: 200,
            height: 200,
            marginLeft: -50,
          }}></View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  errorText: {
    fontSize: 12,
    color: themeColors.blue,
    paddingLeft: 10,
    fontStyle: 'italic',
    paddingTop: 10,
  },
});
