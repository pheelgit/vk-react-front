import React from 'react';

import { authApi, postApi, userApi } from 'shared';
import { useSelector } from 'react-redux';

import { Avatar, Button, Card, Statistic, Typography } from 'antd';

import { EyeOutlined, HeartFilled, DeleteOutlined } from '@ant-design/icons';

import styles from './Post.module.scss';

export const Post = ({ postData }) => {
  const token = useSelector((state) => state.auth.token);
  const [removePost] = postApi.useRemovePostMutation();

  const { user: userId } = postData;

  const { data } = userApi.useGetUserQuery(
    { id: userId, token },
    { skip: !token }
  );

  const { data: authData } = authApi.useGetMeQuery(token, { skip: !token });

  const isAuthUsePost = authData?.posts.includes(postData._id);

  const handleRemovePost = async () => {
    try {
      await removePost({
        postId: postData?._id,
        token: token,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Card
        className={styles.wrapper}
        extra={
          isAuthUsePost && (
            <>
              <Button
                onClick={handleRemovePost}
                type="ghost"
                children={<DeleteOutlined style={{ fontSize: '1.5em' }} />}
              />
            </>
          )
        }
        title={
          <div className={styles.postTitle}>
            <Avatar src={data?.avatarUrl} size="large" />
            <Typography.Title level={2} children={postData?.title} />
          </div>
        }
      >
        <Typography.Text className={styles.postText}>
          {postData?.text}
        </Typography.Text>
        <div className={styles.postStats}>
          <Statistic value={postData?.viewsCount} prefix={<EyeOutlined />} />
          <Statistic value={postData?.viewsCount} prefix={<HeartFilled />} />
        </div>
        {/* <Typography>{postData?._id}</Typography> */}
      </Card>
    </>
  );
};
