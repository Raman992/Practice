import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const url = process.env.NEXT_PUBLIC_LOGIN_URL

interface LoginRequest {
  Username: string;
  Password: string;
}

interface LoginResponse {
  Token: string;
  UserName: string;
  FullName: string;
  CustomerId: number;
  Roles: string;
  Message: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: url,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      // Get token from Redux state or localStorage
      const token = (getState() as any)?.auth?.token || 
                   (typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('auth') || '{}')?.token : null);
      
      headers.set("Content-Type", "application/json");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "login",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;