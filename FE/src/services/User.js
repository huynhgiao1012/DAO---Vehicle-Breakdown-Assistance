import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IP, KEY_TOKEN} from '../utils/constants';
import {getLocalStorageByKey} from '../common/LocalStorage';

// Define a service using a base URL and expected endpoints

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `http://${IP}:3000/api/v1/user`,
    prepareHeaders: async (headers, query) => {
      const Token = await getLocalStorageByKey(KEY_TOKEN);
      console.log('TOKEN' + ' ' + Token);
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
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetUserDetailQuery, useGetUserPointQuery} = userApi;
