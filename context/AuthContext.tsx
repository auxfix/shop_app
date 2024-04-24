import { router } from 'expo-router';
import { createContext, useContext, useState } from 'react';

import { UsersApi } from '~/services/api/users.api';
import { User, userDl } from '~/services/data/users.dl';

const userApi = new UsersApi(userDl);

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

interface AuthProps {
  authState: { authenticated: boolean | null; user: User | null; role: Role };
  onLogin: (username: string, password: string) => void;
  onLogout: () => void;
}

const AuthContext = createContext<Partial<AuthProps>>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    authenticated: boolean | null;
    user: User | null;
    role: Role | null;
  }>({
    authenticated: null,
    user: null,
    role: null,
  });

  const login = async (username: string, password: string) => {
    const user = await userApi.findUser(username, password);
    if (user) {
      setAuthState({
        authenticated: true,
        user,
        role: user.role,
      });
      if (user.role === Role.USER) {
        router.push('/(nav)/shop');
      } else if (user.role === Role.ADMIN) {
        router.push('/(nav)/orders');
      }
    } else {
      alert('Invalid username or password!');
    }
  };

  const logout = async () => {
    setAuthState({
      authenticated: null,
      user: null,
      role: null,
    });
  };

  const value = {
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
