import React from 'react';
import { Post } from 'entities/index';
import { postApi, userApi } from 'shared';
import { Navigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Skeleton } from 'antd';

export const UserPostsList = () => {
  const { id } = useParams();
  const token = useSelector((state) => state.auth.token);
  const { data: getMe } = userApi.useGetUserQuery(
    { id, token },
    { skip: !token }
  );

  const { data: postsList = [], isLoading } = postApi.useGetUserPostsQuery(
    {
      userId: id,
      token: token,
    },
    {
      skip: !token,
    }
  );

  if (!id) {
    return <Navigate to="login" />;
  }

  return (
    <>
      {isLoading &&
        getMe?.posts?.map((postId) => (
          <Skeleton key={postId} avatar paragraph={{ row: 3 }} />
        ))}

      {postsList &&
        postsList?.map((post) => (
          <Post key={post?._id} postData={{ ...post }} />
        ))}
    </>
  );
};
