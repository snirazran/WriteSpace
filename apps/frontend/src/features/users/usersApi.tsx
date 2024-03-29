import { useEffect, useState } from 'react';
import SWR from 'swr';
import { UsersApiFactory } from 'api-client/users';
import { useAxios } from '../../context/AxiosContext';
import { getEnvVar } from '../../utils/getENV';

export const useUsersApi = () => {
  const axios = useAxios();
  const [apiBaseUrl, setApiBaseUrl] = useState(
    `${getEnvVar('VITE_API_USERS_SERVICE_URL')}`
  );
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

export const useGetUserById = (id: string, options = {}) => {
  const { userControllerGetUserById } = useUsersApi();

  const fetcher = (_key: string) => userControllerGetUserById(id);

  const { data, error, isLoading, mutate } = SWR(`user-${id}`, fetcher);
  return { data, error, isLoading, mutate };
};

export const useGetAllUsers = (options = {}) => {
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

export const useGetUserLikes = (id: string, options = {}) => {
  const { userControllerGetUserLikes } = useUsersApi();

  const fetcher = (_key: string) => userControllerGetUserLikes(id);

  const { data, error, isLoading, mutate } = SWR(`userlikes-${id}`, fetcher);
  return { data, error, isLoading, mutate };
};
