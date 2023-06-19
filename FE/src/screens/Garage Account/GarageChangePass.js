import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import {themeColors} from '../../theme';
import {TextInput} from 'react-native-gesture-handler';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useChangePasswordMutation} from '../../services/User';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const changePasswordValidationSchema = yup.object().shape({
  oldPassword: yup.string().required('Old Password is required'),
  newPassword: yup
    .string()
    .required('New Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*`<>])(?=.{8,})/,
      'Must Contain 8 Characters, Uppercase, Lowercase, Number and Special Case Character',
    ),
});
export default function GarageChangePass() {
  const navigation = useNavigation();
  const [changePassword] = useChangePasswordMutation();
  const changePass = val => {
    changePassword({...val})
      .unwrap()
      .then(payload => {
        console.log(payload);
        if (payload) {
          Alert.alert('Your Password has been changed', payload.message, [
            {
              text: 'OK',
            },
          ]);
        }
        navigation.navigate('GarageHomeScreen');
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
    <View style={{flex: 1}}>
      <Header />
      <View style={{marginVertical: 50}}>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            marginVertical: 20,
            color: themeColors.blue,
          }}>
          CHANGE PASSWORD
        </Text>
        <Formik
          validationSchema={changePasswordValidationSchema}
          onSubmit={values => changePass(values)}
          initialValues={{oldPassword: '', newPassword: ''}}>
          {({errors, handleChange, handleSubmit, touched}) => {
            return (
              <View style={{marginHorizontal: 20}}>
                <Text
                  style={{
                    color: themeColors.primaryColor,
                    fontSize: 18,
                    fontWeight: '800',
                    marginBottom: 10,
                  }}>
                  Old Password
                </Text>
                <TextInput
                  onChangeText={handleChange('oldPassword')}
                  secureTextEntry
                  style={{
                    borderWidth: 2,
                    borderColor: themeColors.blue,
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    fontSize: 16,
                    fontWeight: '600',
                    color: themeColors.blue,
                  }}
                />
                {errors.oldPassword && touched.oldPassword && (
                  <Text style={styles.errorText}>*{errors.oldPassword}*</Text>
                )}
                <Text
                  style={{
                    color: themeColors.primaryColor,
                    fontSize: 18,
                    fontWeight: '800',
                    marginVertical: 10,
                  }}>
                  New Password
                </Text>
                <TextInput
                  onChangeText={handleChange('newPassword')}
                  secureTextEntry
                  style={{
                    borderWidth: 2,
                    borderColor: themeColors.blue,
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    fontSize: 16,
                    fontWeight: '600',
                    color: themeColors.blue,
                  }}
                />
                {errors.newPassword && touched.newPassword && (
                  <Text style={styles.errorText}>*{errors.newPassword}*</Text>
                )}
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={{
                    alignSelf: 'center',
                    backgroundColor: themeColors.blue,
                    padding: 15,
                    width: '90%',
                    borderRadius: 15,
                    marginTop: 20,
                  }}>
                  <Text
                    style={{
                      color: themeColors.white,
                      textAlign: 'center',
                      fontSize: 18,
                      fontWeight: 'bold',
                    }}>
                    Change Password
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
