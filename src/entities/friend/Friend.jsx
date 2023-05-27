import React from 'react';

import { friendApi } from 'shared';
import { useSelector } from 'react-redux';

import { Avatar, Typography } from 'antd';

import { DeleteOutlined } from '@ant-design/icons';

import styles from './Friend.module.scss';
import { useNavigate } from 'react-router-dom';

export const Friend = ({ friend, remove }) => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const goToFriendPage = () => {
    navigate(`/${friend?._id}`);
  };

  const handleRemoveFriend = async () => {
    await remove({ token, friendId: friend?._id });
  };

  return (
    <div className={styles.postTitle}>
      <div className={styles.friend}>
        <Avatar
          src={friend?.avatarUrl}
          size="large"
          className={styles.avatar}
          onClick={() => goToFriendPage()}
        />
        <Typography.Title
          level={2}
          children={friend.fullName}
          className={styles.title}
          onClick={() => goToFriendPage()}
        />
      </div>
      <div className={styles.removeFriend} onClick={handleRemoveFriend}>
        <DeleteOutlined style={{ fontSize: '1.5em' }} />
      </div>
    </div>
  );
};
