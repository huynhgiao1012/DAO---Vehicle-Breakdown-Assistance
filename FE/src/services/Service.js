import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IP, KEY_TOKEN} from '../utils/constants';
import {getLocalStorageByKey} from '../common/LocalStorage';

// Define a service using a base URL and expected endpoints

export const serviceApi = createApi({
  reducerPath: 'serviceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `http://${IP}:3000/api/v1/service`,
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
    getCompanyService: builder.mutation({
      query: ({id}) => ({
        url: `/getAllService/${id}`,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetCompanyServiceMutation} = serviceApi;
