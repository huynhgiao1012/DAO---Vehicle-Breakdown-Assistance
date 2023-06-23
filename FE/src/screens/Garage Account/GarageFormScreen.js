import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  Alert,
  Linking,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../Components/Header';
import {TouchableOpacity} from 'react-native';
import {themeColors} from '../../theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';
import {useEffect} from 'react';
import {
  useGetAllFormGarageMutation,
  useGetFormDetailMutation,
  useUpdateProcessMutation,
  useUpdateDoneMutation,
  useDeleteFormMutation,
} from '../../services/OrderForm';
import {useNavigation} from '@react-navigation/native';

const statusForm = ['Await', 'Process', 'Done'];
export default function GarageFormScreen({route}) {
  const navigation = useNavigation();
  const {socketIo} = route.params;
  const [socket, setSocket] = useState(null);
  const [status, setStatus] = useState('Await');
  const [getAllFormGarage] = useGetAllFormGarageMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [detail, setDetail] = useState([]);
  const [getFormDetail] = useGetFormDetailMutation();
  const [updateProcess] = useUpdateProcessMutation();
  const [updateDone] = useUpdateDoneMutation();
  const [deleteFormDone] = useDeleteFormMutation();
  const [form, setForm] = useState([]);
  useEffect(() => {
    console.log('socketIo from form garage', socketIo);
    setSocket(socketIo);
    setStatus('Await');
    getAllFormGarage()
      .unwrap()
      .then(payload => {
        console.log(payload.data);
        setForm([]);
        if (payload.data) {
          const filterData = payload.data.filter(val => val.status === 'await');
          setForm(prev => [...prev, ...filterData]);
        }
      });
  }, []);
  useEffect(() => {
    getAllFormGarage()
      .unwrap()
      .then(payload => {
        setForm([]);
        if (payload.data) {
          if (status === 'Await') {
            const filterData = payload.data.filter(
              val => val.status === 'await',
            );
            setForm(prev => [...prev, ...filterData]);
          } else if (status === 'Process') {
            const filterData = payload.data.filter(
              val => val.status === 'process',
            );
            setForm(prev => [...prev, ...filterData]);
          } else {
            const filterData = payload.data.filter(
              val => val.status === 'done',
            );
            setForm(prev => [...prev, ...filterData]);
          }
        }
      });
  }, [status]);
  const setStatusFilter = status => {
    setStatus(status);
  };
  // open modal
  const openModal = async id => {
    var Item = [];
    setDetail([]);
    await getFormDetail({id: id})
      .unwrap()
      .then(payload => {
        if (payload.data) {
          Item.push(payload.data);
        }
      });
    setDetail(prev => [...prev, ...Item]);
    setIsOpen(true);
  };
  // update process form
  const AcceptService = id => {
    console.log(id);
    updateProcess({id: id})
      .unwrap()
      .then(payload => {
        console.log(payload);
        if (payload.success === true) {
          form.map(val => {
            if (val._id === id) {
              console.log(val);
              socket.volatile.emit('sendNotification', {
                senderName: val.garageId,
                receiverName: val.customerId._id,
                text: `PROCESSING - Your service is being processed...Technician will arrive within a few minutes`,
              });
            }
          });
          getAllFormGarage()
            .unwrap()
            .then(payload => {
              setForm([]);
              if (payload.data) {
                const filterData = payload.data.filter(
                  val => val.status === 'await',
                );
                setForm(prev => [...prev, ...filterData]);
              }
            });
          setIsOpen(false);
        }
      });
  };
  // update done form
  const ProcessService = id => {
    console.log(id);
    updateDone({id: id})
      .unwrap()
      .then(payload => {
        console.log(payload);
        if (payload.success === true) {
          form.map(val => {
            if (val._id === id) {
              console.log(val);
              socket.volatile.emit('sendNotification', {
                senderName: val.garageId,
                receiverName: val.customerId._id,
                text: `DONE - Your service is done completely...You can pay for service`,
              });
            }
          });
          getAllFormGarage()
            .unwrap()
            .then(payload => {
              setForm([]);
              if (payload.data) {
                const filterData = payload.data.filter(
                  val => val.status === 'process',
                );
                setForm(prev => [...prev, ...filterData]);
              }
            });
          setIsOpen(false);
        }
      });
  };
  // delete form
  const deleteForm = id => {
    deleteFormDone({id: id})
      .unwrap()
      .then(payload => {
        console.log(payload);
        if (payload.success === true) {
          Alert.alert('DELETE SERVICE', payload.message, [
            {
              text: 'OK',
            },
          ]);
        }
      });
    getAllFormGarage()
      .unwrap()
      .then(payload => {
        setForm([]);
        if (payload.data) {
          const filterData = payload.data.filter(
            val => val.status === 'process',
          );
          setForm(prev => [...prev, ...filterData]);
        }
      });
    setIsOpen(false);
  };
  return (
    <View
      style={{
        backgroundColor: themeColors.white,
        flex: 1,
      }}>
      <Header />
      <View>
        <SelectDropdown
          data={statusForm}
          defaultValueByIndex={0} // use default value by index or default value
          // defaultValue={'Canada'} // use default value by index or default value
          onSelect={(selectedItem, index) => {
            setStatusFilter(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          buttonStyle={styles.buttonStyle}
          buttonTextStyle={styles.buttonTextStyle}
          renderDropdownIcon={isOpened => {
            return (
              <Icon
                name={isOpened ? 'chevron-up' : 'chevron-down'}
                color={themeColors.white}
                size={18}
              />
            );
          }}
          dropdownIconPosition={'right'}
          dropdownStyle={styles.dropdownStyle}
          rowTextStyle={styles.rowTextStyle}
        />
      </View>
      {/* LIST */}
      <FlatList
        data={form}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => openModal(item._id)}>
            <View style={styles.item}>
              <Text
                style={{
                  fontSize: 16,
                  color: themeColors.gray60,
                  fontStyle: 'italic',
                  alignSelf: 'flex-end',
                }}>
                Date: {item.date.slice(0, 10).split('-').reverse().join('-')}
              </Text>
              {status === 'Done' && item.isPaid === false && (
                <Text
                  style={{
                    fontSize: 16,
                    color: themeColors.blue,
                    fontStyle: 'italic',
                    alignSelf: 'flex-end',
                  }}>
                  NOT PAID
                </Text>
              )}
              {status === 'Done' && item.isPaid === true && (
                <Text
                  style={{
                    fontSize: 16,
                    color: themeColors.blue,
                    fontStyle: 'italic',
                    alignSelf: 'flex-end',
                  }}>
                  PAID
                </Text>
              )}
              <Text style={styles.title}>
                Customer's name: {item.customerId.name}
              </Text>
              <Text style={styles.title}>Service: {item.serviceId.type}</Text>
              <Text
                style={{
                  fontSize: 16,
                  color: themeColors.gray60,
                  fontStyle: 'italic',
                }}>
                Address: {item.address}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item._id}
      />
      {/* modal */}
      {detail.length !== 0 && (
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            presentationStyle="overFullScreen"
            visible={isOpen}>
            <View
              style={{
                backgroundColor: '#000000aa',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={styles.modalView}>
                <TouchableOpacity
                  onPress={() => {
                    setIsOpen(false);
                  }}
                  style={{
                    backgroundColor: themeColors.blue,
                    padding: 10,
                    borderBottomLeftRadius: 10,
                    borderTopRightRadius: 20,
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
                    fontSize: 20,
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
                <Text style={styles.modalText}>
                  Customer's Name: {detail[0].customerId.name}
                </Text>
                <Text
                  style={styles.modalText}
                  onPress={() =>
                    Linking.openURL(`tel:${detail[0].customerId.phone}`)
                  }>
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
                    flexDirection: 'row',
                    marginVertical: 20,
                  }}>
                  {status === 'Await' && (
                    <TouchableOpacity
                      onPress={() => AcceptService(detail[0]._id)}
                      style={styles.buttonModal}>
                      <Text
                        style={{
                          color: themeColors.white,
                          fontWeight: '600',
                          alignSelf: 'center',
                        }}>
                        ACCEPT
                      </Text>
                    </TouchableOpacity>
                  )}
                  {status === 'Process' && (
                    <TouchableOpacity
                      style={styles.buttonModal}
                      onPress={() => ProcessService(detail[0]._id)}>
                      <Text
                        style={{
                          color: themeColors.white,
                          fontWeight: '600',
                          alignSelf: 'center',
                        }}>
                        DONE
                      </Text>
                    </TouchableOpacity>
                  )}
                  {/* {status === 'Done' && (
                    <TouchableOpacity
                      style={styles.buttonModal}
                      onPress={() => deleteForm(detail[0]._id)}>
                      <Text
                        style={{
                          color: themeColors.white,
                          fontWeight: '600',
                          alignSelf: 'center',
                        }}>
                        DELETE
                      </Text>
                    </TouchableOpacity>
                  )} */}
                </View>
                {status !== 'Done' && (
                  <View
                    style={{
                      width: '100%',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setIsOpen(false);
                        navigation.navigate('ViewPathScreen', {
                          address: detail[0].address,
                        });
                      }}
                      style={{
                        backgroundColor: themeColors.blue,
                        padding: 10,
                        borderRadius: 10,
                        width: '85%',
                        marginHorizontal: 20,
                      }}>
                      <Text
                        style={{
                          color: themeColors.white,
                          fontWeight: '600',
                          alignSelf: 'center',
                        }}>
                        VIEW PATH
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </Modal>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  buttonStyle: {
    width: '90%',
    backgroundColor: themeColors.primaryColor,
    margin: 20,
    borderRadius: 15,
  },
  buttonTextStyle: {
    color: themeColors.white,
    fontWeight: '700',
    fontSize: 20,
  },
  dropdownStyle: {
    backgroundColor: themeColors.white,
    borderRadius: 15,
  },
  rowTextStyle: {
    color: themeColors.primaryColor,
    fontWeight: '500',
  },
  item: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderColor: themeColors.primaryColor,
    borderWidth: 2,
    borderRadius: 15,
  },
  title: {
    fontSize: 18,
    color: themeColors.blue,
    fontWeight: '400',
    paddingVertical: 3,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '90%',
    height: '70%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    alignSelf: 'flex-start',
    fontSize: 16,
    color: themeColors.blue,
    fontWeight: '600',
    paddingVertical: 10,
  },
  buttonModal: {
    backgroundColor: themeColors.primaryColor,
    padding: 10,
    borderRadius: 10,
    width: '85%',
    marginHorizontal: 10,
  },
});
