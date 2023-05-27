import { SERVER_URL } from 'shared';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const localToken = window.localStorage.getItem('token');

export const friendApi = createApi({
  reducerPath: 'friend',
  baseQuery: fetchBaseQuery({ baseUrl: `${SERVER_URL}/api/friend` }),
  tagTypes: ['Friends'],
  endpoints: (builder) => ({
    getUserFriends: builder.query({
      query: ({ id, token = localToken }) => ({
        url: '/',
        headers: { authorization: token },
        params: { id },
        providesTags: (result) => {
          return result
            ? [
                ...result?.map(({ _id }) => ({ type: 'Friends', id: _id })),
                { type: 'Friends', id: 'LIST' },
              ]
            : [{ type: 'Friends', id: 'LIST' }];
        },
      }),
    }),

    addFriend: builder.mutation({
      query: ({ friendId, token = localToken }) => ({
        url: `/${friendId}`,
        method: 'post',
        headers: { authorization: token },
      }),
      invalidatesTags: (result, error, arg) =>
        result
          ? [
              { type: 'Friends', id: result._id },
              { type: 'Friends', id: 'LIST' },
            ]
          : [{ type: 'Friends', id: 'LIST' }],
    }),
    removeFriend: builder.mutation({
      query: ({ friendId, token = localToken }) => ({
        url: `/${friendId}`,
        method: 'delete',
        headers: { authorization: token },
      }),
      invalidatesTags: (result, error, arg) =>
        result
          ? [
              { type: 'Friends', id: result._id },
              { type: 'Friends', id: 'LIST' },
            ]
          : [{ type: 'Friends', id: 'LIST' }],
    }),
  }),
});
