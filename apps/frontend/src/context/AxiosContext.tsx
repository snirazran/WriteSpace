import { createContext, useContext, useMemo, ReactNode } from 'react';
import axios, { AxiosInstance } from 'axios';
import appConfig from '../config';
import { useAuth } from './AuthContext';
const AxiosContext = createContext<AxiosInstance | undefined>(undefined);

export const useAxios = (): AxiosInstance => {
  const context = useContext(AxiosContext);
  if (!context) {
    throw new Error('useAxios must be used within an AxiosProvider');
  }
  return context;
};

interface AxiosProviderProps {
  children: ReactNode;
}

const config = {
  baseURL: appConfig.baseURL,
  timeout: 5000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const AxiosProvider = ({
  children,
}: AxiosProviderProps): JSX.Element => {
  const { user } = useAuth();
  const axiosInstance = useMemo(() => {
    const instance = axios.create(config);

    if (user?.token) {
      instance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${user.token}`;
    } else {
      delete instance.defaults.headers.common['Authorization'];
    }

    return instance;
  }, [user]);

  return (
    <AxiosContext.Provider value={axiosInstance}>
      {children}
    </AxiosContext.Provider>
  );
};
