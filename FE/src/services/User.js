import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IP, KEY_TOKEN} from '../utils/constants';
import {clearStorage, getLocalStorageByKey} from '../common/LocalStorage';

// Define a service using a base URL and expected endpoints

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `http://${IP}:3000/api/v1/user`,
    prepareHeaders: async (headers, query) => {
      const Token = await getLocalStorageByKey(KEY_TOKEN);
      if (Token) {
        headers.set('authorization', `Bearer ${Token}`);
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    getUserDetail: builder.query({
      query: () => ({
        url: '/userDetail',
      }),
    }),
    getUserPoint: builder.query({
      query: () => ({
        url: '/userPoint',
      }),
    }),
    getCompanyAccountDetail: builder.query({
      query: () => ({
        url: '/userDetail',
      }),
    }),
    changePassword: builder.mutation({
      query: payload => ({
        url: '/updatePassword',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetUserDetailQuery,
  useGetUserPointQuery,
  useGetCompanyAccountDetailQuery,
  useChangePasswordMutation,
} = userApi;
