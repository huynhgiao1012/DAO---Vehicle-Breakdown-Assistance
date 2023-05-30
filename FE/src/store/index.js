import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {authApi} from '../services/Auth';
import {userApi} from '../services/User';
import {mapApi} from '../services/Map';
import authSlice from '../slices/authSlice';
export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [mapApi.reducerPath]: mapApi.reducer,
    authSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      mapApi.middleware,
    ),
});
setupListeners(store.dispatch);
