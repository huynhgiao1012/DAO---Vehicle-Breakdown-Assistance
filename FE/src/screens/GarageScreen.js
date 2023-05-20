import {View, Text, ScrollView, Image, StyleSheet} from 'react-native';
import React from 'react';
import {themeColors} from '../theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import ServiceList from '../screens/ServiceList';
import Rating from '../Components/Rating';
import Header from '../Components/Header';
export default function GarageScreen() {
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
            paddingLeft: 20,
            width: 200,
          }}>
          <Text
            style={{
              fontSize: 26,
              fontWeight: 'bold',
              color: themeColors.primaryColor,
            }}>
            ABC GARAGE
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
              0235678929
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
              Số 110 Lạc Long Quân, Tây Hồ, Hà Nội
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
              info@otohathanh.com
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
          }}>
          Hà Thành có đội ngũ nhân viên chăm sóc khách hàng và kỹ thuật có nhiều
          kinh nghiệm trong lĩnh vực. Hà Thành có diện tích gara rất rộng thông
          thoáng, sạch sẽ với đầy đủ trang thiết bị, hệ thống máy móc hiện đại
          đáp như nhu cầu phục vụ cho khách hàng. Sau khi sơn xe xong, Hà Thành
          còn hướng dẫn khách hàng cách chăm sóc xe khi sử dụng để đảm bảo lớp
          sơn được mới lâu hơn. Bên cạnh đó thợ ở đây cũng sẽ tiến hành bọc, che
          chắn phần vỏ ngoài xe bằng lớp nilon dán xe chuyên dụng.
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
        <ServiceList />
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
