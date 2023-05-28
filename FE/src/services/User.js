import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://192.168.1.4:3000/api/v1/user'}),
  prepareHeaders: (headers, {getState}) => {
    console.log('hihi');
    const {
      authSlice: {token},
    } = getState();
    console.log('states: ', token);
    headers.set('Authorization', 'Bearer' + token);
    return headers;
  },
  endpoints: builder => ({
    getUserDetail: builder.query({
      query: ({getState}) => ({
        url: '/detail',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetUserDetailQuery} = userApi;
