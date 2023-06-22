import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "../services/Auth";
import { userApi } from "../services/User";
import authSlice from "../slices/authSlice";
import { companyApi } from "../services/Company";
import { serviceApi } from "../services/Service";
import { formApi } from "../services/OrderForm";
export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [companyApi.reducerPath]: companyApi.reducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
    [formApi.reducerPath]: formApi.reducer,
    authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      companyApi.middleware,
      serviceApi.middleware,
      formApi.middleware
    ),
});
setupListeners(store.dispatch);
