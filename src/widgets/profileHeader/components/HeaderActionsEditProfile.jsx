import { Button, Form, Input, Modal, Radio } from 'antd';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { authApi } from 'shared';

export const HeaderActionsEditProfile = () => {
  const token = useSelector((state) => state.auth.token);
  const { data: getMeData } = authApi.useGetMeQuery(token, { skip: !token });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      fullName: getMeData?.fullName,
      avatarUrl: getMeData?.avatarUrl,
      city: getMeData?.city,
      university: getMeData?.university,
    },
  });

  const [open, setOpen] = useState(false);

  const onCloseModal = () => {
    reset();
    setOpen(false);
  };

  const onSubmitLogin = async (data) => {
    try {
      // const { data } = await loginUserApi({ email, password });
      // dispatch(saveToken(data.token));
      // window.localStorage.setItem('token', data.token);
      // navigate(`/${data._id}`);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        редактировать профиль
      </Button>

      <Modal
        open={open}
        title="Изменить профиль:"
        footer={null}
        onCancel={onCloseModal}
      >
        <form onSubmit={handleSubmit(onSubmitLogin)}>
          <Controller
            control={control}
            name="fullName"
            render={({ field }) => (
              <Input {...field} placeholder="имя и фамилия" />
            )}
          />
          <Controller
            control={control}
            name="avatarUrl"
            render={({ field }) => (
              <Input {...field} placeholder="ссылка на аватарку" />
            )}
          />

          <Controller
            control={control}
            name="city"
            render={({ field }) => <Input {...field} placeholder="город" />}
          />
          <Controller
            control={control}
            name="university"
            render={({ field }) => (
              <Input {...field} placeholder="университет" />
            )}
          />
          <div className="flex justify-end gap-10 bg-slate-500">
            <Button
              htmlType="reset"
              children="отменить"
              onClick={() => reset()}
            />
            <Button htmlType="submit" children="изменить" />
          </div>
        </form>
      </Modal>
    </>
  );
};
