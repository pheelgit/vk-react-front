import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { authApi } from 'shared';
import { useDispatch, useSelector } from 'react-redux';

import styles from './RegisterPage.module.scss';
import { Input } from 'antd';
import { saveToken } from 'app/store/slices/authSlice';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '123qwe@ya.ru',
      password: '123qwe',
    },
  });

  const [registerUser, { isError: isErrorRegister }] =
    authApi.useRegisterUserMutation();
  const token = useSelector((state) => state.auth.token);
  const { data: userData } = authApi.useGetMeQuery(token, { skip: !token });

  const onSubmitLogin = async ({ email, password, fullName }) => {
    const { data } = await registerUser({ email, password, fullName });
    console.log(data);
    dispatch(saveToken(data.token));
    window.localStorage.setItem('token', data.token);
    navigate(`/${data?._id}`);
  };

  if (isErrorRegister) {
    alert('error');
  }

  useEffect(() => {
    if (userData) {
      return <Navigate to={`/${userData?._id}`} />;
    }
  }, [userData]);

  return (
    <form
      className={styles.registerForm}
      onSubmit={handleSubmit(onSubmitLogin)}
    >
      <Controller
        control={control}
        name="fullName"
        render={({ field }) => <Input {...field} placeholder="имя и фамилия" />}
      />

      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <Input type="email" {...field} placeholder="email..." />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <Input type="password" {...field} placeholder="пароль..." />
        )}
      />

      <NavLink to="/login">
        <button children="есть аккаунт?" />
      </NavLink>
      <input type="submit" value="войти" />
    </form>
  );
};
