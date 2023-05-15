import { useEffect, useState } from 'react';
import SWR from 'swr';
import { UsersApiFactory } from 'api-client/users';
import { useAxios } from '../../context/AxiosContext';

export const useUsersApi = () => {
  const axios = useAxios();
  const [apiBaseUrl, setApiBaseUrl] = useState('http://localhost:3000');
  const [api, setApi] = useState(
    UsersApiFactory(
      {
        isJsonMime: (mime) => mime === 'application/json',
      },
      apiBaseUrl,
      axios
    )
  );

  useEffect(() => {
    setApi(
      UsersApiFactory(
        {
          isJsonMime: (mime) => mime === 'application/json',
        },
        apiBaseUrl,
        axios
      )
    );
  }, [axios]);

  return api;
};

export const useGetUserById = (id: string) => {
  const { userControllerGetUserById } = useUsersApi();
  const { data, error, isLoading, mutate } = SWR(id, userControllerGetUserById);
  return { data, error, isLoading, mutate };
};

export const useGetAllUsers = () => {
  const { userControllerGetAllUsers } = useUsersApi();
  const {
    data,
    error,
    isLoading,
    isValidating: isInitiallyLoading,
    mutate,
  } = SWR('/allUsers', userControllerGetAllUsers);
  return { data, error, isLoading, isInitiallyLoading, mutate };
};
