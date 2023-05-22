import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useRef} from 'react';
import Header from '../Components/Header';
import {themeColors} from '../theme';

export default function OTPScreen() {
  const pin1Ref = useRef(null);
  const pin2Ref = useRef(null);
  const pin3Ref = useRef(null);
  const pin4Ref = useRef(null);

  const [pin1, setPin1] = useState('');
  const [pin2, setPin2] = useState('');
  const [pin3, setPin3] = useState('');
  const [pin4, setPin4] = useState('');
  const verify = () => {};
  return (
    <View style={{backgroundColor: themeColors.primaryColor, flex: 1}}>
      <Header />
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
          />
          <TextInput
            maxLength={1}
            style={styles.input}
            keyboardType="number-pad"
            ref={pin2Ref}
            onChange={pin2 => {
              setPin1(pin2);
              if (pin2 !== '') {
                pin3Ref.current.focus();
              }
            }}
          />
          <TextInput
            maxLength={1}
            style={styles.input}
            keyboardType="number-pad"
            ref={pin3Ref}
            onChange={pin3 => {
              setPin1(pin3);
              if (pin3 !== '') {
                pin4Ref.current.focus();
              }
            }}
          />
          <TextInput
            maxLength={1}
            style={styles.input}
            keyboardType="number-pad"
            ref={pin4Ref}
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
        </View>
        <TouchableOpacity
          onPress={verify()}
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