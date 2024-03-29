import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useRef} from 'react';
import Header from '../Components/Header';
import {themeColors} from '../theme';
import {useNavigation} from '@react-navigation/native';
import {useOTPVerifyMutation} from '../services/Auth';

export default function OTPScreen({route}) {
  const navigation = useNavigation();
  const {id} = route.params;
  const [OTPverify, {isLoading}] = useOTPVerifyMutation();
  const pin1Ref = useRef(null);
  const pin2Ref = useRef(null);
  const pin3Ref = useRef(null);
  const pin4Ref = useRef(null);

  const [pin1, setPin1] = useState('');
  const [pin2, setPin2] = useState('');
  const [pin3, setPin3] = useState('');
  const [pin4, setPin4] = useState('');

  const verify = () => {
    clearInput();
    const otpString = [pin1, pin2, pin3, pin4];
    if (
      pin1 === undefined ||
      pin2 === undefined ||
      pin3 === undefined ||
      pin4 === undefined
    ) {
      Alert.alert('Notification', 'Please input OTP code');
    }
    const body = {id: id, otp: otpString.join('')};
    OTPverify(body)
      .unwrap()
      .then(payload => {
        console.log(payload);
        if (payload.success === true) {
          Alert.alert(
            'Notification',
            'Verify successfully ! Please login again...',
          );
          navigation.navigate('Login');
        }
      })
      .catch(error => {
        // if (error) {
        //   Alert.alert('Notification', error.data.message.duplicate, [
        //     {text: 'OK', onPress: () => console.log('OK Pressed')},
        //   ]);
        // }
        Alert.alert('Notification', error.data.message, [
          {
            text: 'OK',
          },
        ]);
      });
  };
  const clearInput = () => {
    pin1Ref.current.clear();
    pin2Ref.current.clear();
    pin3Ref.current.clear();
    pin4Ref.current.clear();
  };
  return (
    <View style={{backgroundColor: themeColors.primaryColor, flex: 1}}>
      <View
        style={{
          backgroundColor: themeColors.white,
          marginHorizontal: 30,
          marginVertical: 50,
          borderRadius: 20,
        }}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={{width: 200, height: 200, alignSelf: 'center'}}
        />
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            color: themeColors.blue,
            alignSelf: 'center',
          }}>
          OTP VERIFICATION
        </Text>
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
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingHorizontal: 20,
            paddingVertical: 30,
          }}>
          <TextInput
            maxLength={1}
            style={styles.input}
            keyboardType="number-pad"
            ref={pin1Ref}
            onChange={pin1 => {
              setPin1(pin1);
              if (pin1 !== '') {
                pin2Ref.current.focus();
              }
            }}
            onChangeText={newText => setPin1(newText)}
          />
          <TextInput
            maxLength={1}
            style={styles.input}
            keyboardType="number-pad"
            ref={pin2Ref}
            onChange={pin2 => {
              setPin2(pin2);
              if (pin2 !== '') {
                pin3Ref.current.focus();
              }
            }}
            onChangeText={newText => setPin2(newText)}
          />
          <TextInput
            maxLength={1}
            style={styles.input}
            keyboardType="number-pad"
            ref={pin3Ref}
            onChange={pin3 => {
              setPin3(pin3);
              if (pin3 !== '') {
                pin4Ref.current.focus();
              }
            }}
            onChangeText={newText => setPin3(newText)}
          />
          <TextInput
            maxLength={1}
            style={styles.input}
            keyboardType="number-pad"
            ref={pin4Ref}
            onChangeText={newText => setPin4(newText)}
          />
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 14,
              color: themeColors.primaryColor,
              fontWeight: '800',
              fontStyle: 'italic',
            }}>
            Resend OTP
          </Text>
          <TouchableOpacity onPress={clearInput}>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 14,
                color: themeColors.gray60,
                fontWeight: '600',
                fontStyle: 'italic',
              }}>
              Change Number
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={verify}
          style={{
            alignSelf: 'center',
            backgroundColor: themeColors.primaryColor,
            padding: 10,
            width: '80%',
            borderRadius: 10,
            marginVertical: 40,
          }}>
          <Text
            style={{
              color: themeColors.white,
              textAlign: 'center',
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            Verify
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    backgroundColor: themeColors.gray,
    width: 50,
    height: 50,
    borderRadius: 20,
    textAlign: 'center',
    color: themeColors.blue,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
