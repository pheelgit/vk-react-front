import { SERVER_URL } from 'shared';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postApi = createApi({
  reducerPath: 'post',
  baseQuery: fetchBaseQuery({ baseUrl: `${SERVER_URL}/api/post/` }),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    getUserPosts: builder.query({
      query: ({ token, userId }) => ({
        url: `/all/${userId}`,
        headers: { authorization: token },
      }),
      providesTags: ['Posts'],
    }),
    createPost: builder.mutation({
      query: ({ body, token }) => ({
        // body: title text
        url: '/',
        method: 'post',
        headers: { authorization: token },
        body,
      }),
      invalidatesTags: ['Posts'],
    }),
    removePost: builder.mutation({
      query: ({ postId, token }) => ({
        // body: title, text
        url: `/${postId}`,
        method: 'delete',
        headers: { authorization: token },
      }),

      invalidatesTags: ['Posts'],
    }),
  }),
});
