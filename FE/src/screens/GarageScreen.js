import {View, Text, ScrollView, Image, StyleSheet} from 'react-native';
import React from 'react';
import {themeColors} from '../theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import ServiceList from '../screens/ServiceList';
import Rating from '../Components/Rating';
import Header from '../Components/Header';
import {useEffect} from 'react';
import {useGetCompanyDetailMutation} from '../services/Company';

import {useState} from 'react';

export default function GarageScreen({route}) {
  const [getCompanyDetail] = useGetCompanyDetailMutation();

  const {id, socketIO} = route.params;
  const [data, setData] = useState({
    companyDetail: {
      __v: 0,
      _id: '',
      accountId: '',
      address: '',
      closeTime: '',
      createAt: '',
      createdAt: '',
      lat: 0,
      long: 0,
      openTime: '',
      updatedAt: '',
    },
    data: {
      __v: 0,
      _id: '',
      createdAt: '',
      email: '',
      isActive: false,
      name: '',
      password: '',
      phone: '',
      role: '',
      updatedAt: '',
    },
    success: true,
  });

  useEffect(() => {
    getCompanyDetail({id: id})
      .unwrap()
      .then(payload => {
        setData(data => ({
          ...data,
          ...payload,
        }));
        console.log('data', data);
      })
      .catch(error => {
        return error;
      });
  }, []);

  return (
    <ScrollView>
      <Header />
      <View style={styles.headerView}>
        <View>
          <Image
            source={require('../../assets/images/garage.jpg')}
            style={styles.image}
          />
          <Rating />
        </View>
        <View
          style={{
            paddingLeft: 15,
            width: 200,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: themeColors.primaryColor,
            }}>
            {data ? data.data.name : ''}
          </Text>
          <View style={styles.iconTextHeader}>
            <Icon
              name="phone-square"
              size={20}
              color={themeColors.blue}
              style={{marginRight: 8}}
            />
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: themeColors.blue,
                fontStyle: 'italic',
              }}>
              {data ? data.data.phone : ''}
            </Text>
          </View>
          <View style={styles.iconTextHeader}>
            <Icon
              name="map-marker"
              size={25}
              color={themeColors.blue}
              style={{marginRight: 8}}
            />
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: themeColors.blue,
                fontStyle: 'italic',
              }}>
              {data ? data.companyDetail.address : ''}
            </Text>
          </View>
          <View style={styles.iconTextHeader}>
            <Icon
              name="envelope"
              size={16}
              color={themeColors.blue}
              style={{marginRight: 8}}
            />
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: themeColors.blue,
                fontStyle: 'italic',
              }}>
              {data ? data.data.email : ''}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.info}>
        <View style={styles.title}>
          <Icon
            name="info-circle"
            size={22}
            color={themeColors.blue}
            style={{marginRight: 8}}
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: themeColors.blue,
            }}>
            INFORMATION
          </Text>
        </View>
        <Text
          style={{
            paddingHorizontal: 20,
            fontSize: 14,
            fontStyle: 'italic',
            color: themeColors.gray60,
            textAlign: 'justify',
          }}>
          {data ? data.data.name : ''} là một địa chỉ chuyên cung cấp dịch vụ
          dịch vụ bảo trì, bảo dưỡng và sửa chữa xe ô tô. Uy tín, chất lượng,
          chuyên nghiệp, tận tình, nhanh chóng, giá tốt nhất. Với đội ngũ nhân
          viên chuyên nghiệp kỹ thuật cao có tinh thần trách nhiệm với nghề
          nghiệp của mình được đào tạo về dịch vụ sửa chữa bảo trì thay thế phụ
          tùng xe ô tô một cách bài bản. Cùng với đó là những thiết bị dụng cụ,
          trang thiết bị máy móc cho sửa chữa hiện đại, được đầu tư mới và cải
          tiến thường xuyên nhằm phục vụ đầy đủ nhất, toàn diện nhất cho quý
          khách hàng.
        </Text>
        <View style={styles.title}>
          <Icon
            name="car"
            size={22}
            color={themeColors.blue}
            style={{marginRight: 8}}
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: themeColors.blue,
            }}>
            SERVICE
          </Text>
        </View>
        <ServiceList id={id} socketIO={socketIO} />
        <View style={styles.title}>
          <Icon
            name="gratipay"
            size={22}
            color={themeColors.blue}
            style={{marginRight: 8}}
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: themeColors.blue,
            }}>
            FEEDBACK
          </Text>
        </View>
        <View style={styles.feedback}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Icon
              name="user-circle-o"
              size={35}
              color={themeColors.blue}
              style={{marginVertical: 10, marginLeft: 20, marginRight: 10}}
            />
            <Text style={{fontWeight: '800', color: themeColors.blue}}>
              John Smith
            </Text>
          </View>
          <Text style={{marginHorizontal: 20, marginBottom: 15}}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </Text>
        </View>
        <View style={styles.feedback}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Icon
              name="user-circle-o"
              size={35}
              color={themeColors.blue}
              style={{marginVertical: 10, marginLeft: 20, marginRight: 10}}
            />
            <Text style={{fontWeight: '800', color: themeColors.blue}}>
              John Smith
            </Text>
          </View>
          <Text style={{marginHorizontal: 20, marginBottom: 15}}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderColor: themeColors.black,
    borderBottomWidth: 1,
    marginHorizontal: 20,
    paddingVertical: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
    borderColor: themeColors.primaryColor,
    borderWidth: 5,
  },
  iconTextHeader: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 3,
    alignItems: 'center',
  },

  title: {
    marginHorizontal: 20,
    marginVertical: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  feedback: {
    backgroundColor: themeColors.white,
    marginHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
});
