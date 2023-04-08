import axios from 'axios';
import config from '../config';

interface User {
  username: string;
  email: string;
  token: string;
  password: string;
  friends: string[];
  bio: string;
  img: string;
}

const instance = axios.create({
  baseURL: config.baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getAccessToken = (): string | null => {
  const userData = localStorage.getItem('user');
  const user: User | null = userData ? JSON.parse(userData) : null;
  return user ? user.token : null;
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
