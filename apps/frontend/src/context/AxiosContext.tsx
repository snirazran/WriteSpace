import { createContext, useContext, useMemo, ReactNode } from 'react';
import axios, { AxiosInstance } from 'axios';
import { User } from '../utils/user';
import appConfig from '../config';

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
  user: User | null;
}

const config = {
  baseURL: appConfig.baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const AxiosProvider = ({
  children,
  user,
}: AxiosProviderProps): JSX.Element => {
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
