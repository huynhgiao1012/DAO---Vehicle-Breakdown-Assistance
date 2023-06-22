import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IP } from ".././Utils/constants";

// Define a service using a base URL and expected endpoints

export const companyApi = createApi({
  reducerPath: "companyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://${IP}:3000/api/v1/company`,
    prepareHeaders: async (headers, query) => {
      const Token = localStorage.getItem("token");
      if (Token) {
        headers.set("authorization", `Bearer ${Token}`);
        headers.set("Content-Type", "application/json");
        headers.set("Accept", "application/json");
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCorCompany: builder.query({
      query: () => ({
        url: "/getCorCompany",
      }),
    }),
    getCompanyDetail: builder.mutation({
      query: ({ id }) => ({
        url: `/getCompanyDetail/${id}`,
      }),
    }),
    getSpecificCorCompany: builder.query({
      query: () => ({
        url: "/getSpecificCorCompany",
      }),
    }),
    createCompany: builder.mutation({
      query: (payload) => ({
        url: "/create",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
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
  useCreateCompanyMutation,
} = companyApi;
