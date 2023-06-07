import axios, { AxiosInstance } from 'axios';
import { useEffect, useState } from 'react';
import appConfig from '../config';
import { useUser } from './useUser';

const config = {
  baseURL: appConfig.baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const useAxios = () => {
  const [user] = useUser();
  const [axiosInstance, setAxios] = useState<AxiosInstance>(
    axios.create(config)
  );

  useEffect(() => {
    const instance = axios.create(config);
    instance.interceptors.request.use(
      (config) => {
        if (user?.token) {
          config.headers['Authorization'] = `Bearer ${user?.token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    setAxios(instance);
  }, [user?.token]);

  return axiosInstance;
};
