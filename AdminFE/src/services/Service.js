import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IP } from "../Utils/constants";

// Define a service using a base URL and expected endpoints

export const serviceApi = createApi({
  reducerPath: "serviceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://${IP}:3000/api/v1/service`,
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
    getCompanyService: builder.mutation({
      query: ({ id }) => ({
        url: `/getAllService/${id}`,
      }),
    }),
    addService: builder.mutation({
      query: ({ id, ...payload }) => ({
        url: `/add/${id}`,
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
    updateService: builder.mutation({
      query: ({ id, ...payload }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
    deleteService: builder.mutation({
      query: ({ id }) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetCompanyServiceMutation,
  useAddServiceMutation,
  useDeleteServiceMutation,
  useUpdateServiceMutation,
} = serviceApi;
