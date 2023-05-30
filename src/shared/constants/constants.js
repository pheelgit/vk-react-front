export const SERVER_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://vk-react-back.vercel.app'
    : 'http://localhost:4444';

export const DEFAULT_USER_AVATAR_URL = 'https://vk.com/images/camera_200.png';
