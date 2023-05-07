import { AuthProvider } from './AuthContext';
import { AxiosProvider } from './AxiosContext';
export const AppProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <AuthProvider>
      <AxiosProvider>{children}</AxiosProvider>
    </AuthProvider>
  );
};
