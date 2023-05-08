import { login } from './authService';
import SWRMutate from 'swr/mutation';

interface UserData {
  email: string;
  password: string;
}

export const useLogin = () => {
  const { data, error, isMutating, reset, trigger } = SWRMutate(
    'login',
    (_url: string, { arg }: { arg: UserData }) => login(arg)
  );

  return { data, error, isLoading: isMutating, reset, trigger };
};
