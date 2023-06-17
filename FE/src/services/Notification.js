import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IP, KEY_TOKEN} from '../utils/constants';
import {clearStorage, getLocalStorageByKey} from '../common/LocalStorage';

// Define a service using a base URL and expected endpoints

export const notiApi = createApi({
  reducerPath: 'notiApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `http://${IP}:3000/api/v1/notification`,
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
    createNoti: builder.mutation({
      query: payload => ({
        url: '/create',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    getUnreadNoti: builder.mutation({
      query: () => ({
        url: `/getUnreadNotification`,
      }),
    }),
    updateNoti: builder.mutation({
      query: ({id}) => ({
        url: `/updateNoti/${id}`,
        method: 'PATCH',
      }),
    }),
  }),
});
export const {
  useCreateNotiMutation,
  useGetUnreadNotiMutation,
  useUpdateNotiMutation,
} = notiApi;
