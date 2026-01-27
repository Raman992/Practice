import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jsonApi = createApi({
  reducerPath: "jsonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<any[], void>({
      query: () => "posts",
    }),
  }),
});

export const { useGetPostsQuery } = jsonApi;
