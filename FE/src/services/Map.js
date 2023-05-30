import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_KEY} from '../utils/constants';
// Define a service using a base URL and expected endpoints

export const mapApi = createApi({
  reducerPath: 'mapApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rsapi.goong.io',
  }),
  tagTypes: ['Map'],
  endpoints: builder => ({
    distanceMatrix: builder.mutation({
      query: ({latitude, longitude, string}) => ({
        url: `/DistanceMatrix?origins=${latitude},${longitude}&destinations=${string}&vehicle=truck&api_key=${API_KEY}`,
      }),
      invalidatesTags: ['Map'],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useDistanceMatrixMutation} = mapApi;
