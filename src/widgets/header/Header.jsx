import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authApi } from 'shared';
import { VKLogo } from './VKLogo';

import { Avatar, Dropdown, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { removeToken } from 'app/store/slices/authSlice';
import styles from './Header.module.scss';

export const Header = () => {
  const token = useSelector((state) => state.auth.token);
  const { data: getMeData } = authApi.useGetMeQuery(token, { skip: !token });
  const dispatch = useDispatch();

  function logOut() {
    window.localStorage.removeItem('token');
    dispatch(removeToken());
  }

  const items = [
    {
      key: '1',
      label: (
        <Typography.Text onClick={() => logOut()}>
          выйти из профиля
        </Typography.Text>
      ),
    },
  ];

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <NavLink to={`${getMeData?._id}`}>
            <VKLogo />
          </NavLink>
        </div>
        <div className={styles.searchPanel}>search panel </div>
        <div className={styles.userMenu}>
          <Dropdown
            placement="bottomRight"
            menu={{
              items,
            }}
          >
            <Avatar
              size={45}
              src={getMeData?.avatarUrl}
              icon={<UserOutlined />}
            />
          </Dropdown>
        </div>
      </div>
    </>
  );
};
