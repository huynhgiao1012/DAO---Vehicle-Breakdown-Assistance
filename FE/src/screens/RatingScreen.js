import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {themeColors} from '../theme';
import {useNavigation} from '@react-navigation/native';
import {useCreateFeedbackMutation} from '../services/Feedback';
export default function RatingScreen({route}) {
  const navigation = useNavigation();
  const starRatingOptions = [1, 2, 3, 4, 5];
  const [createFeedback] = useCreateFeedbackMutation();
  const [starRating, setStarRating] = useState(0);
  const [text, setText] = useState('');

  const animatedButtonScale = new Animated.Value(0.8);
  const {item} = route.params;
  const startImageFilled = require('../../assets/images/star_filled.png');
  const startImageCorner = require('../../assets/images/star_corner.png');
  const handlePressIn = () => {
    if (starRating < 5) {
      setStarRating(starRating + 1);
    }
    Animated.spring(animatedButtonScale, {
      toValue: 0.9,
      useNativeDriver: true,
      speed: 10,
      bounciness: 2,
    }).start();
  };

  const handlePressOut = () => {
    if (starRating > 1) {
      setStarRating(starRating - 1);
    }
    Animated.spring(animatedButtonScale, {
      toValue: 0.9,
      useNativeDriver: true,
      speed: 10,
      bounciness: 2,
    }).start();
  };

  const animatedScaleStyle = {
    transform: [{scale: animatedButtonScale}],
  };
  const onSubmitForm = () => {
    if (!starRating) {
      Alert.alert('Noification', 'Please drag on the star for rating', [
        {
          text: 'OK',
        },
      ]);
    }
    createFeedback({
      customerId: item.customerId,
      garageId: item.garageId._id,
      rating: starRating,
      review: text,
    })
      .unwrap()
      .then(payload => {
        console.log(payload);
        if (payload.success) {
          navigation.navigate('Home');
        }
      });
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: themeColors.primaryColor,
        paddingVertical: 100,
      }}>
      <Text
        style={{
          fontSize: 18,
          fontStyle: 'italic',
          fontWeight: '500',
          color: themeColors.white,
          margin: 20,
        }}>
        Please give your feedback for the next better service ^^
      </Text>
      <Text
        style={{
          fontSize: 25,
          fontWeight: 'bold',
          color: themeColors.white,
          marginHorizontal: 20,
          marginBottom: 10,
        }}>
        Rating
      </Text>
      <View style={styles.stars}>
        {starRatingOptions.map(option => (
          <TouchableWithoutFeedback
            onPressIn={() => handlePressIn(option)}
            onPressOut={() => handlePressOut(option)}
            onPress={() => setStarRating(option)}
            key={option}>
            <Animated.View style={animatedScaleStyle}>
              <Image
                style={{width: 40, height: 40, marginHorizontal: 5}}
                source={
                  starRating >= option ? startImageFilled : startImageCorner
                }
              />
            </Animated.View>
          </TouchableWithoutFeedback>
        ))}
      </View>
      <Text
        style={{
          fontSize: 25,
          fontWeight: 'bold',
          color: themeColors.white,
          marginHorizontal: 20,
          marginVertical: 10,
        }}>
        Feedback
      </Text>
      <TextInput
        placeholder="Give feedback here..."
        style={{
          width: '90%',
          height: 80,
          backgroundColor: themeColors.white,
          marginHorizontal: 20,
          paddingHorizontal: 20,
          color: themeColors.blue,
          fontSize: 18,
          borderRadius: 20,
        }}
        onChangeText={text => setText(text)}
      />
      <TouchableOpacity
        onPress={() => onSubmitForm()}
        style={{
          alignSelf: 'center',
          backgroundColor: themeColors.white,
          padding: 10,
          width: '50%',
          borderRadius: 10,
          marginVertical: 30,
        }}>
        <Text
          style={{
            color: themeColors.primaryColor,
            textAlign: 'center',
            fontSize: 18,
            fontWeight: 'bold',
          }}>
          Submit
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  stars: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: themeColors.white,
    marginHorizontal: 20,
    borderRadius: 20,
    paddingVertical: 10,
  },
  starUnselected: {
    color: '#aaa',
  },
  starSelected: {
    color: '#ffb300',
  },
});
