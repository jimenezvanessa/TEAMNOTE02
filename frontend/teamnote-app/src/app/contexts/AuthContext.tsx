// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api, setAuthToken, getUsers as apiGetUsers, login as apiLogin, register as apiRegister } from '../services/api';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'member' | 'leader'; // Match API
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: 'member' | 'leader') => Promise<void>;
  logout: () => void;
  loading: boolean;
  getUsers: (role?: 'member' | 'leader') => Promise<User[]>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      setAuthToken(savedToken);
    }

    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const { token: newToken, user: newUser } = await apiLogin({ email, password });

    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));

    setToken(newToken);
    setUser(newUser);
    setAuthToken(newToken);
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    role: 'member' | 'leader'
  ) => {
    const { token: newToken, user: newUser } = await apiRegister({ name, email, password, role });

    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));

    setToken(newToken);
    setUser(newUser);
    setAuthToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setAuthToken();
  };

  const fetchUsers = async (role: 'member' | 'leader' = 'member') => {
    // apiGetUsers already returns res.data
    return apiGetUsers(role);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        loading,
        getUsers: fetchUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};