import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IP } from "../Utils/constants";

// Define a service using a base URL and expected endpoints

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://${IP}:3000/api/v1/user`,
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
    getUserDetail: builder.query({
      query: () => ({
        url: "/userDetail",
      }),
    }),
    getUserPoint: builder.query({
      query: () => ({
        url: "/userPoint",
      }),
    }),
    getCompanyAccountDetail: builder.query({
      query: () => ({
        url: "/userDetail",
      }),
    }),
    getAllUser: builder.mutation({
      query: () => ({
        url: "/getAllUser",
      }),
    }),
    getUser: builder.mutation({
      query: ({ id }) => ({
        url: `/detail/${id}`,
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, ...payload }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
    deleteUser: builder.mutation({
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
  useGetUserDetailQuery,
  useGetUserPointQuery,
  useGetCompanyAccountDetailQuery,
  useGetUserMutation,
  useGetAllUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
