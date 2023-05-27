import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import { saveToken } from 'app/store/slices/authSlice';

import { Button, Input } from 'antd';
import { authApi } from 'shared';

import styles from './LoginPage.module.scss';
export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const localToken = window.localStorage.getItem('token');

  const { data: getMeData } = authApi.useGetMeQuery(localToken || token, {
    skip: !token,
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: 'witharr@ya.ru',
      password: '123wwwww',
    },
  });

  const [
    loginUserApi,
    {
      isLoading,
      isSuccess: isSuccessLogin,
      isError: isErrorLogin,
      data: dataLogin = {},
    },
  ] = authApi.useLoginUserMutation();

  const logFunc = async () => {
    dispatch(saveToken(localToken));
    if (getMeData) {
      navigate(`/${getMeData?._id}`);
    }
  };

  useEffect(() => {
    if (localToken) {
      logFunc();
    }
  }, [getMeData]);

  const onSubmitLogin = async ({ email, password }) => {
    try {
      const { data } = await loginUserApi({ email, password });
      dispatch(saveToken(data.token));
      window.localStorage.setItem('token', data.token);
      navigate(`/${data?._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  if (isErrorLogin) {
    alert('error');
  }

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit(onSubmitLogin)}>
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <Input {...field} autoComplete="on" placeholder="email..." />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <Input
            type="password"
            {...field}
            autoComplete="on"
            placeholder="password..."
          />
        )}
      />

      <Input type="submit" value="войти" />
      <br />
      <Button
        type="ghost"
        children={<NavLink to="/register" children="нет аккаунта?" />}
      />
    </form>
  );
};
