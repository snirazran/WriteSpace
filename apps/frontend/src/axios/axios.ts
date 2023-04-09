import axios from 'axios';
import config from '../config';
import { User, getUserFromLocalStorage } from '../utils/user';

const instance = axios.create({
  baseURL: config.baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getAccessToken = (): string | null => {
  const user: User | null = getUserFromLocalStorage();
  if (user) {
    return user.token;
  } else {
    console.log('User not found in local storage');
    return null;
  }
};

instance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { instance as axios };
