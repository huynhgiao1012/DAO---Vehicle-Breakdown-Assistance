import {
  View,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  ScrollView,
} from 'react-native';
import React, {useEffect} from 'react';
import Header from '../Components/Header';
import {useNavigation} from '@react-navigation/native';
import {themeColors} from '../theme';
import {
  useGetAllFormCustomerMutation,
  useGetFormDetailMutation,
} from '../services/OrderForm';
import {useState} from 'react';

export default function MyServiceScreen() {
  const navigation = useNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const [getAllFOrm] = useGetAllFormCustomerMutation();
  const [detail, setDetail] = useState([]);
  const [getFormDetail] = useGetFormDetailMutation();
  const [data, setData] = useState([]);
  useEffect(() => {
    getAllFOrm()
      .unwrap()
      .then(payload => {
        if (payload) {
          setData([]);
          payload.data.map(val => {
            setData(prev => [...prev, val]);
          });
        }
      });
  }, []);
  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //   setTimeout(() => {
  //     setRefreshing(false);
  //   }, 2000);
  // }, []);
  const showModal = async id => {
    var Item = [];
    setDetail([]);
    await getFormDetail({id: id})
      .unwrap()
      .then(payload => {
        console.log(payload.data);
        if (payload.data) {
          Item.push(payload.data);
        }
      });
    setDetail(prev => [...prev, ...Item]);
    setIsOpen(true);
  };
  const listFooter = () => {
    return (
      <View
        style={{
          width: '100%',
          height: 30,
          backgroundColor: themeColors.white,
          marginTop: 20,
        }}></View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: themeColors.white}}>
      <Header />
      <View style={{backgroundColor: themeColors.white}}>
        <Text
          style={{
            alignSelf: 'center',
            fontWeight: 'bold',
            fontSize: 25,
            marginVertical: 20,
            color: themeColors.blue,
          }}>
          Booked Service
        </Text>
        <FlatList
          style={{backgroundColor: 'white', marginBottom: 100}}
          ItemSeparatorComponent={
            Platform.OS !== 'android' &&
            (({highlighted}) => (
              <View
                style={[styles.separator, highlighted && {marginLeft: 0}]}
              />
            ))
          }
          data={data}
          ListFooterComponent={listFooter}
          renderItem={({item, index, separators}) => (
            <TouchableOpacity
              key={item._id}
              onPress={() => showModal(item._id)}>
              <View
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderTopWidth: 1,
                  marginHorizontal: 20,
                  borderTopColor: themeColors.gray,
                  marginVertical: 10,
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignContent: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontWeight: '900',
                      fontSize: 18,
                      color: themeColors.blue,
                    }}>
                    {item.garageId.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      color: themeColors.gray60,
                      fontStyle: 'italic',
                    }}>
                    {item.date.slice(0, 10).split('-').reverse().join('-')}
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: themeColors.gray60,
                    }}>
                    {item.serviceId.type}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: themeColors.gray60,
                      fontWeight: '800',
                    }}>
                    {item.price}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 18,
                    color: themeColors.primaryColor,
                    fontStyle: 'italic',
                    fontWeight: 'bold',
                  }}>
                  {item.status}
                </Text>
                {item.status === 'done' && item.isPaid === false && (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('PaymentScreen', {item: item})
                    }
                    style={{
                      alignSelf: 'flex-end',
                      backgroundColor: themeColors.blue,
                      width: 80,
                      height: 35,
                      padding: 8,
                      borderRadius: 20,
                    }}>
                    <Text
                      style={{
                        color: themeColors.white,
                        alignSelf: 'center',
                        fontWeight: 'bold',
                      }}>
                      Pay
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
          )}
        />
        {detail.length !== 0 && (
          <Modal
            animationType="slide"
            transparent={true}
            presentationStyle="overFullScreen"
            visible={isOpen}>
            <View
              style={{
                backgroundColor: '#000000aa',
                flex: 1,
                marginTop: 'auto',
              }}>
              <View style={styles.modalView}>
                <TouchableOpacity
                  onPress={() => {
                    setIsOpen(false);
                  }}
                  style={{
                    backgroundColor: themeColors.blue,
                    padding: 10,
                    borderBottomLeftRadius: 20,
                    width: 40,
                    position: 'absolute',
                    top: 0,
                    right: 0,
                  }}>
                  <Text
                    style={{
                      color: themeColors.white,
                      fontWeight: '600',
                      alignSelf: 'center',
                    }}>
                    X
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    color: themeColors.blue,
                    fontSize: 22,
                    fontWeight: 'bold',
                    marginBottom: 10,
                  }}>
                  Form Detail
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: themeColors.gray60,
                    fontStyle: 'italic',
                    alignSelf: 'flex-end',
                  }}>
                  Date:{' '}
                  {detail[0].date.slice(0, 10).split('-').reverse().join('-')}
                </Text>
                <Text
                  style={{
                    fontSize: 17,
                    color: themeColors.primaryColor2,
                    fontStyle: 'italic',
                    alignSelf: 'flex-end',
                    fontWeight: 'bold',
                  }}>
                  {detail[0].status}...
                </Text>
                <Text style={styles.modalText}>
                  Name: {detail[0].customerId.name}
                </Text>
                <Text style={styles.modalText}>
                  Phone: {detail[0].customerId.phone}
                </Text>
                <Text style={styles.modalText}>
                  Address: {detail[0].address}
                </Text>
                <Text style={styles.modalText}>
                  Service: {detail[0].serviceId.type}
                </Text>
                <Text style={styles.modalText}>Price: {detail[0].price}</Text>
                <View
                  style={{
                    backgroundColor: themeColors.primaryColor,
                    padding: 10,
                    borderRadius: 15,
                  }}>
                  <Text style={styles.modalText2}>
                    Garage's Name: {detail[0].garageId.name}
                  </Text>
                  <Text style={styles.modalText2}>
                    Garage's Phone: {detail[0].garageId.phone}
                  </Text>
                  <Text style={styles.modalText2}>
                    Garage's Email: {detail[0].garageId.email}
                  </Text>
                </View>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  modalView: {
    width: '100%',
    height: '80%',
    backgroundColor: 'white',
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  modalText: {
    alignSelf: 'flex-start',
    fontSize: 16,
    color: themeColors.blue,
    fontWeight: '600',
    paddingVertical: 8,
  },
  modalText2: {
    alignSelf: 'flex-start',
    fontSize: 16,
    color: themeColors.white,
    fontWeight: '600',
    paddingVertical: 8,
  },
});
