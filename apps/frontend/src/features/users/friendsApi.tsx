import { useEffect, useState } from 'react';
import SWR from 'swr';
import { FriendsApiFactory } from 'api-client/users';
import { useAxios } from '../../context/AxiosContext';

export const useFriendsApi = () => {
  const axios = useAxios();
  const [apiBaseUrl, setApiBaseUrl] = useState('http://localhost:3000');
  const [api, setApi] = useState(
    FriendsApiFactory(
      {
        isJsonMime: (mime) => mime === 'application/json',
      },
      apiBaseUrl,
      axios
    )
  );

  useEffect(() => {
    setApi(
      FriendsApiFactory(
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

export const useAddRemoveFriend = (id: string, friendId: string) => {
  const { friendControllerAddRemoveFriend } = useFriendsApi();
  const {
    data,
    error,
    isLoading,
    isValidating: isInitiallyLoading,
    mutate,
  } = SWR({ id, friendId }, friendControllerAddRemoveFriend);
};

export const useGetUserFriends = (id: string) => {
  const { friendControllerGetUserFriends } = useFriendsApi();

  const {
    data,
    error,
    isLoading,
    isValidating: isInitiallyLoading,
    mutate,
  } = SWR(id, friendControllerGetUserFriends);

  return { data, error, isLoading, isInitiallyLoading, mutate };
};
