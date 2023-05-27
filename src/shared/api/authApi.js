import { SERVER_URL } from 'shared';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const localToken = window.localStorage.getItem('token');

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${SERVER_URL}/api/auth` }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body) => ({
        // body: email password
        url: '/login',
        method: 'post',
        body,
      }),
    }),
    registerUser: builder.mutation({
      query: (body) => ({
        //body fullName email password avatarUrl?
        url: '/register',
        method: 'post',
        body,
      }),
    }),
    getMe: builder.query({
      query: (token = localToken) => ({
        url: '/me',
        headers: { authorization: token },
      }),
    }),
  }),
});
