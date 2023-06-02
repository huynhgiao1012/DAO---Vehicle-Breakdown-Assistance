import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from 'react-native-storage';

const storage = new Storage({
  size: 10,
  storageBackend: AsyncStorage,
  defaultExpires: 8 * 60 * 60 * 1000,
  enableCache: false,
});

export const saveStorage = (key, data) => {
  storage.save({
    key: key,
    data: data,
  });
};
export const clearStorage = key => {
  storage.remove({
    key: key,
  });
};
export const getLocalStorageByKey = async key => {
  try {
    const data = await storage.load({
      key: key,
      autoSync: true,
      syncInBackground: true,
    });
    return data;
  } catch (error) {
    return error;
  }
};
