import {
  View,
  Image,
  Text,
  ActivityIndicator,
  LogBox,
  Modal,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import React from 'react';
import Header from '../Components/Header';
import {themeColors} from '../theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  useGetUserDetailMutation,
  useGetUserPointQuery,
  useUpdateInfoMutation,
} from '../services/User';
import {useEffect} from 'react';
import {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as yup from 'yup';
const serviceSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  phone: yup.string().required('Phone is required'),
});
export default function MyInfo() {
  const [userDetail] = useGetUserDetailMutation();
  const [userData, setData] = useState({
    data: {
      _id: '',
      email: '',
      isActive: false,
      name: '',
      phone: '',
      role: '',
    },
  });
  const userPoint = useGetUserPointQuery();
  const [updateUserInfo] = useUpdateInfoMutation();
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const [isOpen, setIsOpen] = useState(false);
  LogBox.ignoreAllLogs();
  useEffect(() => {
    userDetail()
      .unwrap()
      .then(payload => {
        console.log(payload);
        setData(data => ({
          ...data,
          ...payload,
        }));
      });
  }, []);
  const handleImage = () => {
    console.log('image');
  };
  const updateInfo = () => {
    setIsOpen(true);
  };
  const editInfo = val => {
    updateUserInfo({...val})
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
    userDetail()
      .unwrap()
      .then(payload => {
        console.log(payload);
        setData(data => ({
          ...data,
          ...payload,
        }));
      });
  };
  return !userData ? (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <ActivityIndicator size="large" color={themeColors.primaryColor} />
    </View>
  ) : (
    <View
      style={{
        flex: 1,
        backgroundColor: themeColors.white,
        alignSelf: 'center',
        width: '100%',
      }}>
      <Header />
      <View
        style={{
          padding: 20,
          marginTop: 20,
          position: 'relative',
          alignSelf: 'center',
        }}>
        <Image
          source={require('../../assets/images/welcome.png')}
          style={{
            width: 150,
            height: 150,
            borderRadius: 150,
            borderWidth: 5,
            borderColor: themeColors.primaryColor,
          }}
        />
        <TouchableOpacity
          onPress={handleImage}
          style={{
            position: 'absolute',
            bottom: 20,
            right: 30,
            backgroundColor: themeColors.white,
            padding: 8,
            borderRadius: 20,
            borderColor: themeColors.blue,
            borderWidth: 1,
          }}>
          <Icon
            name="pencil"
            size={17}
            color={themeColors.blue}
            style={{alignSelf: 'center'}}
          />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          fontSize: 30,
          marginHorizontal: 20,
          color: themeColors.primaryColor,
          fontWeight: 'bold',
          alignSelf: 'center',
        }}>
        HELLO ! {userData.data ? userData.data.name : ''}
      </Text>
      <View style={{marginHorizontal: 20}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginTop: 20,
          }}>
          <Icon
            name="address-book"
            size={24}
            color={themeColors.blue}
            style={{alignSelf: 'center'}}
          />
          <Text
            style={{
              color: themeColors.blue,
              marginLeft: 10,
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            Contact
          </Text>
        </View>
        <Text
          style={{
            fontSize: 16,
            color: themeColors.blue,
            fontWeight: '500',
            paddingVertical: 10,
          }}>
          Email: {userData.data ? userData.data.email : ''}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: themeColors.blue,
            fontWeight: '500',
            paddingVertical: 10,
          }}>
          Phone: {userData.data ? userData.data.phone : ''}
        </Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: themeColors.primaryColor,
            marginHorizontal: 20,
            borderRadius: 15,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            marginVertical: 15,
            width: '40%',
          }}>
          <Text
            style={{
              fontSize: 18,
              color: themeColors.white,
              fontWeight: 'bold',
              paddingVertical: 10,
            }}>
            Point:
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: themeColors.white,
              fontWeight: 'bold',
              paddingVertical: 10,
            }}>
            {userPoint.data ? userPoint.currentData.data.point : ''}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('GarageChangePass')}
          style={{
            backgroundColor: themeColors.blue,
            width: '45%',
            borderRadius: 15,
            marginRight: 20,
          }}>
          <Text
            style={{
              fontSize: 18,
              color: themeColors.white,
              fontWeight: 'bold',
              paddingVertical: 10,
              textAlign: 'center',
            }}>
            Change Password
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={updateInfo}
        style={{
          backgroundColor: themeColors.blue,
          width: '90%',
          borderRadius: 15,
          marginHorizontal: 20,
        }}>
        <Text
          style={{
            fontSize: 18,
            color: themeColors.white,
            fontWeight: 'bold',
            paddingVertical: 10,
            textAlign: 'center',
          }}>
          Update Information
        </Text>
      </TouchableOpacity>
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
                fontWeight: '500',
                fontSize: 20,
                fontStyle: 'italic',
              }}>
              UPDATE INFORMATION
            </Text>
            <Formik
              validationSchema={serviceSchema}
              onSubmit={values => editInfo(values)}
              initialValues={{name: '', phone: ''}}>
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
                      Name
                    </Text>
                    <TextInput
                      onChangeText={handleChange('name')}
                      defaultValue={userData.data.name}
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
                    {errors.name && touched.name && (
                      <Text style={styles.errorText}>*{errors.name}*</Text>
                    )}
                    <Text
                      style={{
                        color: themeColors.primaryColor,
                        fontSize: 16,
                        fontWeight: '800',
                        marginVertical: 10,
                      }}>
                      Phone
                    </Text>
                    <TextInput
                      onChangeText={handleChange('phone')}
                      defaultValue={userData.data.phone}
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
                    {errors.phone && touched.phone && (
                      <Text style={styles.errorText}>*{errors.phone}*</Text>
                    )}

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
                        SAVE
                      </Text>
                    </TouchableOpacity>
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
    height: '50%',
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
