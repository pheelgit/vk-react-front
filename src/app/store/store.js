import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import auth from './slices/authSlice';

import { userApi, postApi, friendApi, authApi } from 'shared';

export const store = configureStore({
  reducer: {
    auth,
    [userApi.reducerPath]: userApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [friendApi.reducerPath]: friendApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(postApi.middleware)
      .concat(friendApi.middleware)
      .concat(authApi.middleware),
});

setupListeners(store.dispatch);
