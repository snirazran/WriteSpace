import { useAuth } from './AuthContext';
import { AxiosProvider } from './AxiosContext';
export const AppProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  return <AxiosProvider user={user}>{children}</AxiosProvider>;
};
