import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import App from 'app/App';
import {
  LoginPage,
  UserPage,
  RegisterPage,
  PostPage,
  AddPostPage,
  FriendsPage,
} from 'pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', index: true, element: <UserPage /> }, // сделать страничку не найдет юзер
      { path: '/:id', element: <UserPage /> },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      { path: '/addPost', element: <AddPostPage /> },
      {
        path: '/posts/:id',
        element: <PostPage />,
      },
      {
        path: '/friends',
        element: <FriendsPage />,
      },
    ],
  },
]);
