import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IP, KEY_TOKEN} from '../utils/constants';
import {getLocalStorageByKey} from '../common/LocalStorage';

// Define a service using a base URL and expected endpoints

export const companyApi = createApi({
  reducerPath: 'companyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `http://${IP}:3000/api/v1/company`,
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
    getCorCompany: builder.query({
      query: () => ({
        url: '/getCorCompany',
      }),
    }),
    getCompanyDetail: builder.mutation({
      query: ({id}) => ({
        url: `/getCompanyDetail/${id}`,
      }),
    }),
    getSpecificCorCompany: builder.query({
      query: () => ({
        url: '/getSpecificCorCompany',
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetCorCompanyQuery,
  useGetCompanyDetailMutation,
  useGetSpecificCorCompanyQuery,
} = companyApi;
