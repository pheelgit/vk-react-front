import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userApi, DEFAULT_USER_AVATAR_URL } from 'shared';

import HeaderActions from './components/HeaderActions';
import { Descriptions } from 'antd';

import styles from './ProfileHeader.module.scss';

export const ProfileHeader = () => {
  const { id } = useParams();
  const token = useSelector((state) => state.auth.token);
  const { data: userData } = userApi.useGetUserQuery(
    { id, token },
    { skip: !token }
  );

  return (
    <div className={styles.head}>
      <img
        className={styles.headAvatar}
        alt="user avatar"
        width={150}
        height={150}
        src={userData?.avatarUrl || DEFAULT_USER_AVATAR_URL}
      />
      <div className={styles.profile}>
        <Descriptions
          title={userData?.fullName}
          bordered
          extra="подробнее"
          size="small"
          layout="vertical"
        >
          <Descriptions.Item label="возраст">
            {userData?.fullYears}
          </Descriptions.Item>
          <Descriptions.Item label="город">{userData?.city}</Descriptions.Item>
          <Descriptions.Item label="вуз">
            {userData?.university}
          </Descriptions.Item>
        </Descriptions>

        <div>
          <HeaderActions />
        </div>
      </div>
    </div>
  );
};
