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
      providesTags: (result) => {
        return result
          ? [
              ...result?.map(({ _id }) => ({ type: 'Posts', id: _id })),
              { type: 'Posts', id: 'LIST' },
            ]
          : [{ type: 'Posts', id: 'LIST' }];
      },
    }),
    createPost: builder.mutation({
      query: ({ body, token }) => ({
        // body: title text
        url: '/',
        method: 'post',
        headers: { authorization: token },
        body,
      }),
      invalidatesTags: (result, error, arg) =>
        result
          ? [
              { type: 'Posts', id: result._id },
              { type: 'Posts', id: 'LIST' },
            ]
          : [{ type: 'Posts', id: 'LIST' }],
    }),
    removePost: builder.mutation({
      query: ({ postId, token }) => ({
        // body: title, text
        url: `/${postId}`,
        method: 'delete',
        headers: { authorization: token },
      }),

      invalidatesTags: (result, error, arg) =>
        result
          ? [
              { type: 'Posts', id: result._id },
              { type: 'Posts', id: 'LIST' },
            ]
          : [{ type: 'Posts', id: 'LIST' }],
    }),
  }),
});

// .head {
//   @apply widget flex;
// }

// .headAvatar {
//   @apply basis-['150px'];
// }
// .profile {
//   @apply flex grow items-center justify-evenly;
// }
