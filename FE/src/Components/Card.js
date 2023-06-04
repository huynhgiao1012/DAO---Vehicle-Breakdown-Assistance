import React, {memo} from 'react';
import {Rating} from 'react-native-ratings';
import FastImage from 'react-native-fast-image';
import {StyleSheet, Text, View} from 'react-native';
import {
  INNER_CARD_HEIGHT,
  INNER_CARD_WIDTH,
  OUTER_CARD_HEIGHT,
  OUTER_CARD_WIDTH,
} from '../utils/constants';
import {themeColors} from '../theme';

const Card = ({item}) => (
  <View style={styles.outerCard}>
    <View style={styles.innerCard}>
      {item?.image == 'NA' ? (
        <View style={styles.noView}>
          <Text style={styles.noTxt} numberOfLines={2}>
            No Photo Available
          </Text>
        </View>
      ) : (
        <FastImage
          source={{
            uri: image,
          }}
          style={styles.img}
          resizeMode={FastImage.resizeMode.stretch}
        />
      )}
      <View style={styles.right}>
        <View style={styles.top}>
          <Text numberOfLines={2} style={styles.name}>
            {item?.title}
          </Text>
        </View>
        <View style={styles.bottom}>
          <View style={styles.rating}>
            <Rating
              ratingCount={5}
              type="star"
              readonly={true}
              startingValue={item?.rating || 0}
              imageSize={14}
            />
            <Text style={styles.ratingTxt}>
              {item?.rating || 0} ({item?.totalRatings || 0} Ratings)
            </Text>
          </View>
          <Text numberOfLines={2} style={styles.status}>
            Email: <Text style={styles.black}>{item?.email}</Text>
          </Text>
          <Text style={styles.status} numberOfLines={1}>
            Phone No: <Text style={styles.black}>{item?.phoneNo}</Text>
          </Text>
          <Text style={styles.status} numberOfLines={2}>
            Address: <Text style={styles.black}>{item?.address} </Text>
          </Text>
          <Text style={styles.status} numberOfLines={2}>
            Distance: <Text style={styles.black}>{item?.distance} </Text>
          </Text>
        </View>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  outerCard: {
    flex: 1,
    height: 180,
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
    height: 150,
    width: INNER_CARD_WIDTH,
    overflow: 'hidden',
    elevation: 6,
    padding: 10,
  },
  img: {height: '100%', width: '30%', borderRadius: 6},
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
  black: {color: themeColors.blue, fontWeight: 400},
});

export default memo(Card);
