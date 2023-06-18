import {View, Text, StyleSheet, FlatList, Modal} from 'react-native';
import React, {useState} from 'react';
import Header from '../../Components/Header';
import {TouchableOpacity} from 'react-native';
import {themeColors} from '../../theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';
import {useEffect} from 'react';
import {useGetAllFormGarageMutation} from '../../services/OrderForm';

const statusForm = ['Await', 'Process', 'Done'];
export default function GarageFormScreen() {
  const [status, setStatus] = useState('Waiting');
  const [getAllFormGarage] = useGetAllFormGarageMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [detail, setDetail] = useState({});
  const [form, setForm] = useState([]);
  useEffect(() => {
    getAllFormGarage()
      .unwrap()
      .then(payload => {
        console.log(payload.data);
        setForm([]);
        if (payload.data) {
          setForm(prev => [...prev, ...payload.data]);
        }
      });
  }, []);
  const setStatusFilter = status => {
    setStatus(status);
    console.log(status);
  };
  const openModal = item => {
    console.log(item);
    setDetail({});
    setDetail({...item});
    setIsOpen(true);
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
      <FlatList
        data={form}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => openModal(item)}>
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
              <Text
                style={{
                  color: themeColors.blue,
                  fontSize: 20,
                  fontWeight: 'bold',
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
                Date: {detail.date.slice(0, 10).split('-').reverse().join('-')}
              </Text>
              <Text style={styles.modalText}>
                Customer's Name: {detail.customerId.name}
              </Text>
              <Text style={styles.modalText}>
                Phone: {detail.customerId.phone}
              </Text>
              <Text style={styles.modalText}>Address: {detail.address}</Text>
              <Text style={styles.modalText}>
                Service: {detail.serviceId.type}
              </Text>
              <Text style={styles.modalText}>Price: {detail.price}</Text>
              <View
                style={{
                  alignSelf: 'flex-start',
                  backgroundColor: themeColors.gray,
                  padding: 10,
                  width: '100%',
                  borderRadius: 10,
                }}>
                <Text style={styles.modalText}>Garage's Name:</Text>
                <Text style={styles.modalText}>Address: </Text>
                <Text style={styles.modalText}>Phone: </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 20,
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: themeColors.primaryColor,
                    padding: 10,
                    borderRadius: 10,
                    width: 100,
                    marginHorizontal: 10,
                  }}>
                  <Text
                    style={{
                      color: themeColors.white,
                      fontWeight: '600',
                      alignSelf: 'center',
                    }}>
                    ACCEPT
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setIsOpen(false);
                  }}
                  style={{
                    backgroundColor: themeColors.primaryColor,
                    padding: 10,
                    borderRadius: 10,
                    width: 100,
                    marginHorizontal: 10,
                  }}>
                  <Text
                    style={{
                      color: themeColors.white,
                      fontWeight: '600',
                      alignSelf: 'center',
                    }}>
                    CLOSE
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
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
    height: '80%',
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
});
