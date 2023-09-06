import { useEffect, useState } from 'react';
import SWR from 'swr';
import { FriendsApiFactory } from 'api-client/users';
import { useAxios } from '../../context/AxiosContext';
import SWRMutate from 'swr/mutation';
import { getEnvVar } from '../../utils/getENV';
export const useFriendsApi = () => {
  const axios = useAxios();
  const [apiBaseUrl, setApiBaseUrl] = useState(
    getEnvVar('VITE_API_USERS_SERVICE_URL')
  );
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

export const useAddRemoveFriend = () => {
  const { friendControllerAddRemoveFriend } = useFriendsApi();
  const { data, error, isMutating, reset, trigger } = SWRMutate(
    'addRemoveFriend',
    (_url: string, { arg }: { arg: { id: string; friendId: string } }) =>
      friendControllerAddRemoveFriend(arg.friendId, arg.id)
  );

  return { data, error, isLoading: isMutating, reset, trigger };
};

export const useGetUserFriends = (id: string, options = {}) => {
  const { friendControllerGetUserFriends } = useFriendsApi();

  const fetcher = (_key: string) => friendControllerGetUserFriends(id);

  const {
    data,
    error,
    isLoading,
    isValidating: isInitiallyLoading,
    mutate,
  } = SWR(`userFriends-${id}`, fetcher);
  return { data, error, isLoading, isValidating: isInitiallyLoading, mutate };
};
