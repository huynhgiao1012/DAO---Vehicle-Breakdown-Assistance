import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IP} from '../utils/constants';

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({baseUrl: `http://${IP}:3000/api/v1/auth`}),
  tagTypes: ['Post'],
  endpoints: builder => ({
    register: builder.mutation({
      query: payload => ({
        url: '/register',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['Post'],
    }),
    login: builder.mutation({
      query: payload => ({
        url: '/login',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['Post'],
    }),
    OTPVerify: builder.mutation({
      query: ({id, ...payload}) => ({
        url: `/verifyOTP/${id}`,
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['Post'],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useRegisterMutation, useLoginMutation, useOTPVerifyMutation} =
  authApi;
