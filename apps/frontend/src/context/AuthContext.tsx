import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { User } from '../utils/user';
import { useLocalStorage } from '../utils/useLocalStorage';
import { useGetUserById } from '../features/users/usersApi';

interface AuthContextData {
  user: User | null;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

const PERSISTANT_USER_KEY = 'user';

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [persistantUser, setPersistantUser] = useLocalStorage<User | null>(
    PERSISTANT_USER_KEY,
    null
  );
  const [user, setUser] = useState<User | null>(persistantUser);

  useEffect(() => {
    // Keeps your both states synced
    setPersistantUser(user);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
