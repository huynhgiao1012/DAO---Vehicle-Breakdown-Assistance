import {View, Text, Alert} from 'react-native';
import React from 'react';
import Header from '../Components/Header';
import {
  useCreatePaymentIntentMutation,
  usePaymentMutation,
} from '../services/OrderForm';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {themeColors} from '../theme';
import {useStripe} from '@stripe/stripe-react-native';
import {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
export default function PaymentScreen({route}) {
  const {item} = route.params;
  const navigation = useNavigation();
  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const [payment] = usePaymentMutation();
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  useEffect(() => {
    // console.log(item);
  }, []);
  const onCheckout = async () => {
    // 1. Create a payment intent
    const response = await createPaymentIntent({
      amount: Math.floor(item.price * 10),
    });
    if (response.error) {
      Alert.alert('Something went wrong');
      return;
    }

    // 2. Initialize the Payment sheet
    const initResponse = await initPaymentSheet({
      merchantDisplayName: 'notJust.dev',
      paymentIntentClientSecret: response.data.paymentIntent,
    });
    if (initResponse.error) {
      console.log(initResponse.error);
      Alert.alert('Something went wrong');
      return;
    }

    // 3. Present the Payment Sheet from Stripe
    const paymentResponse = await presentPaymentSheet();

    if (paymentResponse.error) {
      Alert.alert(
        `${paymentResponse.error.code}`,
        paymentResponse.error.message,
      );
      return;
    }

    // 4. If payment ok -> create the order
    payment({id: item._id})
      .unwrap()
      .then(payload => {
        if (payload) {
          navigation.navigate('RatingScreen', {item: item});
        }
      });
  };
  return (
    <View style={{backgroundColor: themeColors.white, flex: 1}}>
      <Header />
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 25,
          fontWeight: 'bold',
          color: themeColors.primaryColor,
          marginVertical: 15,
        }}>
        FORM INFORMATION
      </Text>
      <View style={{marginHorizontal: 20}}>
        <Text
          style={{
            fontStyle: 'italic',
            color: themeColors.white,
            fontSize: 15,
            alignSelf: 'flex-end',
            backgroundColor: themeColors.blue,
            padding: 10,
            borderBottomLeftRadius: 15,
            borderTopRightRadius: 15,
            marginBottom: 10,
          }}>
          Date: {item.date.slice(0, 10).split('-').reverse().join('-')}
        </Text>
        <Text
          style={{
            fontStyle: 'italic',
            color: themeColors.gray60,
            fontSize: 15,
          }}>
          Address: {item.address}
        </Text>
        <Text style={styles.title}>GARAGE</Text>
        <Text style={styles.detail}>Name: {item.garageId.name}</Text>
        <Text style={styles.detail}>Phone: {item.garageId.phone}</Text>
        <Text style={styles.title}>SERVICE</Text>
        <Text style={styles.detail}>Type: {item.serviceId.type}</Text>
        <Text style={styles.detail}>Price: {item.serviceId.price}</Text>
        <Text style={styles.title}>TOTAL PRICE: {item.price}</Text>
      </View>
      <TouchableOpacity
        onPress={onCheckout}
        style={{
          alignSelf: 'center',
          backgroundColor: themeColors.primaryColor,
          padding: 10,
          borderRadius: 10,
          marginVertical: 20,
        }}>
        <Text
          style={{color: themeColors.white, fontWeight: 'bold', fontSize: 16}}>
          PAY FOR SERVICE
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: themeColors.primaryColor,
    paddingVertical: 10,
  },
  detail: {
    fontSize: 16,
    fontWeight: 'bold',
    color: themeColors.blue,
    paddingVertical: 10,
  },
});
