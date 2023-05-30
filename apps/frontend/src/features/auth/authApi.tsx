import { useEffect, useState } from 'react';
import SWRMutate from 'swr/mutation';
import { AuthApiFactory, CreateUserDto } from 'api-client/auth';
import { useAxios } from '../../context/AxiosContext';

interface RegisterUserData {
  username: string;
  email: string;
  password: string;
  img: string | null;
}

interface LoginUserData {
  email: string;
  password: string;
}

export const useAuthApi = () => {
  const axios = useAxios();
  const [apiBaseUrl, setApiBaseUrl] = useState('http://localhost:3001');
  const [api, setApi] = useState(
    AuthApiFactory(
      {
        isJsonMime: (mime) => mime === 'application/json',
      },
      apiBaseUrl,
      axios
    )
  );

  useEffect(() => {
    setApi(
      AuthApiFactory(
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

export const useLogin = () => {
  const { authControllerLoginUser } = useAuthApi();
  const { data, error, isMutating, reset, trigger } = SWRMutate(
    'login',
    (_url: string, { arg }: { arg: LoginUserData }) =>
      authControllerLoginUser(arg)
  );

  return { data, error, isLoading: isMutating, reset, trigger };
};

export const useRegister = () => {
  const { authControllerRegisterUser } = useAuthApi();
  const { data, error, isMutating, reset, trigger } = SWRMutate(
    'register',
    (_url: string, { arg }: { arg: RegisterUserData }) =>
      authControllerRegisterUser(arg)
  );

  return { data, error, isLoading: isMutating, reset, trigger };
};
