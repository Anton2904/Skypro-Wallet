import { useMemo, useState } from 'react';
import { AuthContext } from './authContextInstance';
import { getToken, getUser, removeToken, removeUser, saveToken, saveUser } from '../utils/storage';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser());

  const login = (payload) => {
    saveToken(payload.token);
    saveUser(payload.user);
    setToken(payload.token);
    setUser(payload.user);
  };

  const logout = () => {
    removeToken();
    removeUser();
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({ token, user, isAuthenticated: Boolean(token), login, logout }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
