import { register } from './authService';
import SWRMutate from 'swr/mutation';

interface UserData {
  username: string;
  email: string;
  password: string;
  img?: string;
}

export const useRegister = () => {
  const { data, error, isMutating, reset, trigger } = SWRMutate(
    'register',
    (_url: string, { arg }: { arg: UserData }) => register(arg)
  );

  return { data, error, isLoading: isMutating, reset, trigger };
};
