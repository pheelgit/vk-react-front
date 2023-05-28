import React, { useState } from 'react';
import { authApi, postApi } from 'shared';
import { useForm, Controller } from 'react-hook-form';

import { useSelector } from 'react-redux';
import { Input, Button, Avatar } from 'antd';
import styles from './AddPost.module.scss';

export const AddPost = () => {
  const token = useSelector((state) => state.auth.token);
  const { data: getMe, refetch } = authApi.useGetMeQuery(token, {
    skip: !token,
  });
  const [isActive, setIsActive] = useState(false);

  const [addPost, { isLoading }] = postApi.useCreatePostMutation();
  const { handleSubmit, control, reset } = useForm();

  const handleAddPost = async (value) => {
    await addPost({ body: value, token: token });
    refetch();
    reset();
    setIsActive(false);
  };
  const handleReset = () => {
    reset();
    setIsActive(false);
  };

  return (
    <div className={styles.wrapper}>
      <form
        onSubmit={handleSubmit(handleAddPost)}
        className={styles.form}
        onReset={handleReset}
      >
        <Controller
          control={control}
          name="title"
          render={({ field }) => (
            <Input
              addonBefore={<Avatar src={getMe?.avatarUrl} />}
              placeholder="что у вас нового?"
              size="large"
              onFocus={() => setIsActive(true)}
              {...field}
            />
          )}
        />
        {isActive && (
          <>
            <Controller
              control={control}
              name="text"
              render={({ field }) => (
                <Input.TextArea
                  placeholder="текст поста..."
                  autoSize={{ minRows: 3 }}
                  {...field}
                />
              )}
            />
            <div className={styles.controls}>
              <Button htmlType="reset" children="отмена" />
              <Button
                htmlType="submit"
                loading={isLoading}
                children="написать пост"
              />
            </div>
          </>
        )}
      </form>
    </div>
  );
};
