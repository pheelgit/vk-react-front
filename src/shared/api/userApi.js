import { SERVER_URL } from 'shared';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const localToken = window.localStorage.getItem('token');

export const userApi = createApi({
  reducerPath: 'user',
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
  tagTypes: ['user'],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: ({ id, token = localToken }) => ({
        url: `/${id}`,
        headers: { authorization: token },
      }),
    }),
  }),
});
