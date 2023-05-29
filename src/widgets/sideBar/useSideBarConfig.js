import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { authApi } from 'shared';
import {
  UserOutlined,
  TeamOutlined,
  MessageOutlined,
  CommentOutlined,
} from '@ant-design/icons';

export const useSideBarConfig = () => {
  const token = useSelector((state) => state.auth.token);
  const { data: getMeData } = authApi.useGetMeQuery(token, { skip: !token });

  const [sideBarMenu, setSideBarMenu] = useState([]);

  useEffect(() => {
    setSideBarMenu([
      {
        title: 'моя страница',
        to: `/${getMeData?._id}`,
        icon: <UserOutlined />,
      },
      {
        title: 'новости',
        to: `${getMeData?._id}`,
        icon: <CommentOutlined />,
      },
      {
        title: 'сообщения',
        to: '6469f09520ef32963579c6b7',
        icon: <MessageOutlined />,
      },

      {
        title: 'друзья',
        to: 'friends',
        icon: <TeamOutlined />,
      },
      // {
      //   title: 'к основному',
      //   to: '646395d50cb07d5cd80ac37d',
      //   icon: <MessageOutlined />,
      // },
      // {
      //   title: 'к второму',
      //   to: '/6469f09520ef32963579c6b7',
      //   icon: <MessageOutlined />,
      // },
      // {
      //   title: 'к третьему',
      //   to: '/6469f09520ef32963579c6b7',
      //   icon: <MessageOutlined />,
      // },
      // { title: 'логин', to: '/login', icon: <UserOutlined /> },
    ]);
  }, [getMeData, token]);

  return { sideBarMenu };
};
