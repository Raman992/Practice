import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jsonApi = createApi({
  reducerPath: "jsonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<any[], void>({
      query: () => "users",
    }),
    getUserById: builder.query<any, number>({
      query: (id) => `users/${id}`,
    }),
  }),
});

export const { useGetPostsQuery, useGetUserByIdQuery } = jsonApi;
