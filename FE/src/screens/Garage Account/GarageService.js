import {View, Text, FlatList, Modal, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import {themeColors} from '../../theme';
import {TouchableOpacity} from 'react-native';
import {useEffect} from 'react';
import {
  useAddServiceMutation,
  useGetCompanyServiceMutation,
  useDeleteServiceMutation,
  useUpdateServiceMutation,
} from '../../services/Service';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Formik} from 'formik';
import * as yup from 'yup';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const serviceSchema = yup.object().shape({
  type: yup.string().required('Type is required'),
  description: yup.string().required('Description is required'),
  price: yup.number().required('Price is required'),
});
export default function GarageService({route}) {
  const {id} = route.params;
  const [getCompanyService] = useGetCompanyServiceMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [addService] = useAddServiceMutation();
  const [deleteService] = useDeleteServiceMutation();
  const [updateService] = useUpdateServiceMutation();
  const [editStatus, setEditStatus] = useState(false);
  const [idService, setIdService] = useState('');
  const [service, setService] = useState({
    description: '',
    price: 0,
    type: '',
  });
  useEffect(() => {
    console.log(id);
    getCompanyService({id: id})
      .unwrap()
      .then(payload => {
        setData([]);
        if (payload.data) {
          setData(prev => [...prev, ...payload.data]);
        }
      });
  }, []);
  const addservice = val => {
    const obj = {
      type: val.type,
      description: val.description,
      price: Number(val.price),
    };
    console.log(obj);
    if (editStatus === true) {
      updateService({id: idService, ...obj})
        .unwrap()
        .then(payload => {
          console.log(payload);
          if (payload.success) {
            Alert.alert('UPDATE SERVICE', payload.message, [
              {
                text: 'OK',
              },
            ]);
            getCompanyService({id: id})
              .unwrap()
              .then(payload => {
                setData([]);
                if (payload.data) {
                  setData(prev => [...prev, ...payload.data]);
                }
              });
          }
        });
    } else {
      addService({...obj})
        .unwrap()
        .then(payload => {
          console.log(payload);
          if (payload.success) {
            Alert.alert('ADD SERVICE', payload.message, [
              {
                text: 'OK',
              },
            ]);
            getCompanyService({id: id})
              .unwrap()
              .then(payload => {
                setData([]);
                if (payload.data) {
                  setData(prev => [...prev, ...payload.data]);
                }
              });
          }
        });
    }
    setIsOpen(false);
    setEditStatus(false);
  };
  const onEdit = Item => {
    console.log(Item);
    setIdService(Item._id);
    setService(prev => ({...prev, ...Item}));
    setEditStatus(true);
    setIsOpen(true);
  };
  const onDelete = idItem => {
    deleteService({id: idItem})
      .unwrap()
      .then(payload => {
        if (payload.success) {
          Alert.alert('DELETE SERVICE', payload.message, [
            {
              text: 'OK',
            },
          ]);
        }
        getCompanyService({id: id})
          .unwrap()
          .then(payload => {
            setData([]);
            if (payload.data) {
              setData(prev => [...prev, ...payload.data]);
            }
          });
      });
  };
  return (
    <View style={{flex: 1}}>
      <Header />
      <View>
        <Text
          style={{
            color: themeColors.primaryColor,
            fontSize: 25,
            marginVertical: 20,
            alignSelf: 'flex-start',
            fontWeight: 'bold',
            marginLeft: 20,
          }}>
          Manage Service
        </Text>
        <View
          style={{
            width: 150,
            height: 120,
            position: 'absolute',
            top: 0,
            right: 0,
            backgroundColor: themeColors.gray,
            borderBottomLeftRadius: 150,
          }}></View>
        <View
          style={{
            marginHorizontal: 20,
          }}>
          <TouchableOpacity
            onPress={() => {
              setIsOpen(true);
            }}
            style={{
              backgroundColor: themeColors.blue,
              borderRadius: 10,
              padding: 10,
              width: '50%',
            }}>
            <Text
              style={{
                color: themeColors.white,
                alignSelf: 'center',
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              Add Service
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <View
            style={{
              marginHorizontal: 20,
              marginVertical: 10,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomWidth: 2,
              borderBottomColor: themeColors.gray60,
              paddingVertical: 15,
            }}>
            <View style={{paddingHorizontal: 10, width: '70%'}}>
              <Text
                style={{
                  marginVertical: 10,
                  color: themeColors.blue,
                  fontSize: 16,
                  fontWeight: '700',
                }}>
                Type: {item.type}
              </Text>
              <Text
                style={{
                  color: themeColors.blue,
                  fontSize: 16,
                  fontWeight: '700',
                }}>
                Price: {item.price}
              </Text>
            </View>
            <View
              style={{
                width: '30%',
                flexDirection: 'row',
                justifyContent: 'center',
                paddingRight: 20,
              }}>
              <TouchableOpacity
                onPress={() => onEdit(item)}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  backgroundColor: themeColors.primaryColor,
                  borderTopLeftRadius: 10,
                  height: 40,
                }}>
                <Icon
                  name="pencil-square-o"
                  size={22}
                  color={themeColors.white}
                  style={{alignSelf: 'center'}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onDelete(item._id)}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  backgroundColor: themeColors.blue,
                  marginTop: 15,
                  borderBottomRightRadius: 10,
                }}>
                <Icon
                  name="trash"
                  size={22}
                  color={themeColors.white}
                  style={{alignSelf: 'center'}}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={item => item._id}
      />
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
                setEditStatus(false);
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
                fontWeight: '500',
                fontSize: 20,
                fontStyle: 'italic',
              }}>
              {editStatus ? 'EDIT SERVICE' : 'ADD SERVICE'}
            </Text>
            <Formik
              validationSchema={serviceSchema}
              onSubmit={values => addservice(values)}
              initialValues={{type: '', description: '', price: ''}}>
              {({errors, handleChange, handleSubmit, touched}) => {
                return (
                  <View style={{marginVertical: 20}}>
                    <Text
                      style={{
                        color: themeColors.primaryColor,
                        fontSize: 16,
                        fontWeight: '800',
                        marginBottom: 10,
                      }}>
                      Type
                    </Text>
                    <TextInput
                      onChangeText={handleChange('type')}
                      defaultValue={editStatus && service.type}
                      style={{
                        borderWidth: 1,
                        borderColor: themeColors.blue,
                        borderRadius: 10,
                        paddingHorizontal: 10,
                        fontSize: 16,
                        fontWeight: '600',
                        color: themeColors.blue,
                      }}
                    />
                    {errors.type && touched.type && (
                      <Text style={styles.errorText}>*{errors.type}*</Text>
                    )}
                    <Text
                      style={{
                        color: themeColors.primaryColor,
                        fontSize: 16,
                        fontWeight: '800',
                        marginVertical: 10,
                      }}>
                      Description
                    </Text>
                    <TextInput
                      onChangeText={handleChange('description')}
                      defaultValue={editStatus && service.description}
                      style={{
                        borderWidth: 1,
                        borderColor: themeColors.blue,
                        borderRadius: 10,
                        paddingHorizontal: 10,
                        fontSize: 16,
                        fontWeight: '600',
                        color: themeColors.blue,
                      }}
                    />
                    {errors.description && touched.description && (
                      <Text style={styles.errorText}>
                        *{errors.description}*
                      </Text>
                    )}
                    <Text
                      style={{
                        color: themeColors.primaryColor,
                        fontSize: 16,
                        fontWeight: '800',
                        marginVertical: 10,
                      }}>
                      Price
                    </Text>
                    <TextInput
                      onChangeText={handleChange('price')}
                      defaultValue={editStatus && service.price.toString()}
                      style={{
                        borderWidth: 1,
                        borderColor: themeColors.blue,
                        borderRadius: 10,
                        paddingHorizontal: 10,
                        fontSize: 16,
                        fontWeight: '600',
                        color: themeColors.blue,
                      }}
                    />
                    {errors.price && touched.price && (
                      <Text style={styles.errorText}>*{errors.price}*</Text>
                    )}
                    {editStatus ? (
                      <TouchableOpacity
                        onPress={handleSubmit}
                        style={{
                          alignSelf: 'center',
                          backgroundColor: themeColors.blue,
                          padding: 10,
                          width: '90%',
                          borderRadius: 15,
                          marginTop: 20,
                        }}>
                        <Text
                          style={{
                            color: themeColors.white,
                            textAlign: 'center',
                            fontSize: 18,
                            fontWeight: 'bold',
                          }}>
                          EDIT
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={handleSubmit}
                        style={{
                          alignSelf: 'center',
                          backgroundColor: themeColors.blue,
                          padding: 10,
                          width: '90%',
                          borderRadius: 15,
                          marginTop: 20,
                        }}>
                        <Text
                          style={{
                            color: themeColors.white,
                            textAlign: 'center',
                            fontSize: 18,
                            fontWeight: 'bold',
                          }}>
                          ADD
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                );
              }}
            </Formik>
          </View>
        </View>
      </Modal>
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
    paddingVertical: 10,
  },
  errorText: {
    fontSize: 12,
    color: themeColors.blue,
    paddingLeft: 10,
    fontStyle: 'italic',
    paddingTop: 10,
  },
});
