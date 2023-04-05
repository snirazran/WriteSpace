import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5173',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getAccessToken = () => {
  const userData = localStorage.getItem('user');
  const user = JSON.parse(userData);
  return user.token;
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

export default instance;
