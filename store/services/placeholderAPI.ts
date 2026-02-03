import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jsonApi = createApi({
  reducerPath: "jsonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<
  { users: any[]; total: number },
  void
>({
  query: () => "users",
  transformResponse: (response: any[]) => ({
    users: response,//metadata
    total: response.length,
  }),
}),
    getUserById: builder.query<any, number>({
      query: (id) => `users/${id}`,
    }),
  }),
});

export const { useGetPostsQuery, useGetUserByIdQuery } = jsonApi;
