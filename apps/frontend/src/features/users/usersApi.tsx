import { useEffect, useState } from 'react';
import SWR from 'swr';
import { UsersApiFactory } from 'api-client/users';
import { useAxios } from '../../context/AxiosContext';

export const useUsersApi = () => {
  const axios = useAxios();
  const [api, setApi] = useState(
    UsersApiFactory(
      {
        isJsonMime: (mime) => mime === 'application/json',
      },
      undefined,
      axios
    )
  );

  useEffect(() => {
    setApi(
      UsersApiFactory(
        {
          isJsonMime: (mime) => mime === 'application/json',
        },
        undefined,
        axios
      )
    );
  }, [axios]);

  return api;
};

export const useGetUserById = (id: string) => {
  const { userControllerGetUserById } = useUsersApi();
  const { data, error, isLoading } = SWR(id, userControllerGetUserById);
};

export const useGetAllUsers = () => {
  const usersApi = useUsersApi();
  console.log(usersApi);
  const {
    data,
    error,
    isLoading,
    isValidating: isInitiallyLoading,
    mutate,
  } = SWR('/allUsers', usersApi ? usersApi.userControllerGetAllUsers : null);

  return { data, error, isLoading, isInitiallyLoading, mutate };
};
