import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {authApi} from '../services/Auth';
import {userApi} from '../services/User';
import {mapApi} from '../services/Map';
import authSlice from '../slices/authSlice';
import {companyApi} from '../services/Company';
import {serviceApi} from '../services/Service';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [mapApi.reducerPath]: mapApi.reducer,
    [companyApi.reducerPath]: companyApi.reducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
    authSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      mapApi.middleware,
      companyApi.middleware,
      serviceApi.middleware,
    ),
});
setupListeners(store.dispatch);
