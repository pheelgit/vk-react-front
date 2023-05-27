import { Avatar, Button, Typography } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { authApi, friendApi } from 'shared';
import styles from './UserFriends.module.scss';

export const UserFriends = () => {
  const token = useSelector((state) => state.auth.token);
  const { data: getMeData } = authApi.useGetMeQuery(token, {
    skip: !token,
  });
  const { id } = useParams();

  const { data: userFriends = [] } = friendApi.useGetUserFriendsQuery(
    {
      token,
      id,
    },
    {
      skip: !token,
      refetchOnMountOrArgChange: true,
    }
  );

  return (
    <div className={styles.wrapper}>
      {!userFriends.length ? (
        <Link to={`/friends/${getMeData?._id}`}>
          <Button children="добавить друзей" />
        </Link>
      ) : (
        userFriends?.map((friend) => (
          <Link
            to={`/${friend?._id}`}
            className={styles.card}
            key={friend?._id}
          >
            <Avatar size={80} src={friend.avatarUrl} />
            <Typography.Text className={styles.cardText}>
              {friend.fullName}
            </Typography.Text>
          </Link>
        ))
      )}
    </div>
  );
};
