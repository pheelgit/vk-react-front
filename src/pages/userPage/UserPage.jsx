import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './UserPage.module.scss';
import { UserPostsList } from './components/UserPostsList';
import { UserFriends, AddPost, ProfileHeader } from 'widgets';
import { authApi, friendApi } from 'shared';
import { saveToken } from 'app/store/slices/authSlice';

export const UserPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const localToken = window.localStorage.getItem('token');
  const token = useSelector((state) => state.auth.token);

  localToken ? token || dispatch(saveToken(localToken)) : navigate('/login');

  //88888888888888888

  const { data: getMeData } = authApi.useGetMeQuery(token, {
    skip: !token,
  });

  const logFunc = async () => {
    if (getMeData) {
      navigate(`/${getMeData?._id}`);
    }
  };

  useEffect(() => {
    if (localToken) {
      logFunc();
    }
  }, [getMeData]);

  console.log('mounted');
  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <ProfileHeader />
      </div>
      <div className={styles.main}>
        <div className={styles.content}>
          {id === getMeData?._id && <AddPost />}
          <UserPostsList />
        </div>
        <div className={styles.side}>
          <UserFriends />
        </div>
      </div>
    </div>
  );
};
