import { useLocalStorage } from '../utils/useLocalStorage';
import { User } from '../utils/user';

export const useUser = () => {
  return useLocalStorage<User | null>('user', null);
};
