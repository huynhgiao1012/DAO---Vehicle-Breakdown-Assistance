import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IP } from "../Utils/constants";

// Define a service using a base URL and expected endpoints

export const formApi = createApi({
  reducerPath: "formApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://${IP}:3000/api/v1/form`,
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
    getFormDetail: builder.mutation({
      query: ({ id }) => ({
        url: `/getFormDetail/${id}`,
      }),
    }),
    getAllForm: builder.mutation({
      query: ({ id }) => ({
        url: `/getAllForm/${id}`,
      }),
    }),
    getAllFormAdmin: builder.mutation({
      query: () => ({
        url: `/getAllFormAdmin`,
      }),
    }),
  }),
});
export const {
  useGetFormDetailMutation,
  useGetAllFormMutation,
  useGetAllFormAdminMutation,
} = formApi;
