import React from 'react';
import { authApi, postApi } from 'shared';
import { useForm, Controller } from 'react-hook-form';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from 'antd';
import styles from './AddPostPage.module.scss';

export const AddPostPage = () => {
  const token = useSelector((state) => state.auth.token);
  const { data: getMe } = authApi.useGetMeQuery(token, { skip: !token });
  const navigate = useNavigate();
  const [addPost] = postApi.useCreatePostMutation();
  const { handleSubmit, control } = useForm({
    mode: 'onBlur',
  });
  const handleAddPost = async (value) => {
    console.log(token);
    await addPost({ body: value, token: token });
    navigate(`/${getMe?._id}`);
  };

  return (
    <form onSubmit={handleSubmit(handleAddPost)} className={styles.form}>
      <Controller
        control={control}
        name="title"
        render={({ field }) => (
          <Input addonBefore="заголовок" size="large" {...field} />
        )}
      />
      <Controller
        control={control}
        name="text"
        render={({ field }) => (
          <Input.TextArea placeholder="текст поста..." {...field} />
        )}
      />
      <Button type="default" htmlType="submit" children="написать пост" />
    </form>
  );
};
