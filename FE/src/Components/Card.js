import React, {memo, useEffect, useState} from 'react';
import {Rating} from 'react-native-ratings';
import FastImage from 'react-native-fast-image';
import {StyleSheet, Text, View, Linking, TouchableOpacity} from 'react-native';
import {
  INNER_CARD_HEIGHT,
  INNER_CARD_WIDTH,
  OUTER_CARD_HEIGHT,
  OUTER_CARD_WIDTH,
} from '../utils/constants';
import {themeColors} from '../theme';
import {useGetAllFbMutation} from '../services/Feedback';
import Icon from 'react-native-vector-icons/FontAwesome';

const Card = ({item}) => {
  const [getAllFb] = useGetAllFbMutation();
  const [totalRatings, setTotalRating] = useState(0);
  const [rating, setRating] = useState(0);
  useEffect(() => {
    getAllFb({id: item.id})
      .unwrap()
      .then(payload => {
        console.log(payload.data.length);
        if (payload.data.length > 0) {
          setTotalRating(payload.data.length);
          let num = 0;
          payload.data.map(val => {
            num = val.rating + num;
          });
          setRating(num / payload.data.length);
        }
      });
  }, []);
  const openDialScreen = num => {
    if (Platform.OS === 'ios') {
      number = `telprompt:${num}`;
    } else {
      number = `tel:${num}`;
    }
    Linking.openURL(number);
  };
  return (
    <View style={styles.outerCard}>
      <View style={styles.innerCard}>
        <FastImage
          source={require('../../assets/images/service.png')}
          style={styles.img}
          resizeMode={FastImage.resizeMode.stretch}
        />
        <View style={styles.right}>
          <View style={styles.top}>
            <Text numberOfLines={2} style={styles.name}>
              {item?.title}
            </Text>
          </View>
          <View style={styles.bottom}>
            <View style={styles.rating}>
              <Rating
                ratingCount={rating}
                type="star"
                readonly={true}
                startingValue={rating || 0}
                imageSize={14}
              />
              <Text style={styles.ratingTxt}>
                {rating || 0} ({totalRatings || 0} Ratings)
              </Text>
            </View>
            <Text style={styles.status} numberOfLines={2}>
              Address: <Text style={styles.black}>{item?.address} </Text>
            </Text>
            <Text style={styles.status} numberOfLines={2}>
              Open Time: <Text style={styles.black}>{item?.openTime} </Text>
            </Text>
            <Text style={styles.status} numberOfLines={2}>
              Close Time: <Text style={styles.black}>{item?.closeTime} </Text>
            </Text>
            <Text numberOfLines={2} style={styles.status}>
              Email: <Text style={styles.black}>{item?.email}</Text>
            </Text>
            <TouchableOpacity
              onPress={() => openDialScreen(item?.phoneNo)}
              style={{
                borderColor: themeColors.primaryColor,
                borderRadius: 3,
                paddingHorizontal: 3,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                marginTop: 2,
              }}>
              <Text>
                <Icon name="phone" size={11} color={themeColors.primaryColor} />
              </Text>
              <Text
                style={{
                  fontSize: 11,
                  padding: 3,
                  color: themeColors.primaryColor,
                }}>
                {item?.phoneNo}
              </Text>
            </TouchableOpacity>
            <Text style={styles.status2} numberOfLines={2}>
              Distance: <Text style={styles.status2}>{item?.distance} </Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerCard: {
    flex: 1,
    height: 200,
    width: OUTER_CARD_WIDTH,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  innerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: {x: 2, y: -2},
    height: 200,
    width: INNER_CARD_WIDTH,
    overflow: 'hidden',
    elevation: 6,
    padding: 10,
  },
  img: {height: '100%', width: '40%', borderRadius: 6},
  noView: {
    height: '100%',
    width: '35%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(200,200,200)',
    borderRadius: 5,
  },
  noTxt: {
    fontFamily: 'Montserrat-SemiBold',
    color: 'grey',
    textAlign: 'center',
  },
  right: {flex: 1, paddingLeft: 10},
  top: {
    paddingBottom: 2,
    borderBottomWidth: 1,
    borderColor: '#E5E5E5',
  },
  name: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14.5,
    fontWeight: 'bold',
    color: themeColors.blue,
  },
  bottom: {flex: 1, alignItems: 'flex-start'},
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  ratingTxt: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12.5,
    marginLeft: 5,
    color: themeColors.primaryColor2,
  },
  status: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 11,
    color: themeColors.blue,
    fontWeight: 'bold',
    marginVertical: 1,
  },
  status2: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 11,
    color: themeColors.primaryColor,
    fontWeight: 'bold',
    marginVertical: 1,
    fontStyle: 'italic',
    alignSelf: 'flex-end',
  },
  black: {color: themeColors.blue, fontWeight: 400},
});

export default memo(Card);
