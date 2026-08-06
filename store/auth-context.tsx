'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthUser } from '../types';
import ApiClient from '../lib/api/client';

interface AuthContextType {
  currentUser: AuthUser | null;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<AuthUser>;
  register: (data: { name: string; email: string; phone?: string; password?: string }) => Promise<AuthUser>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isLoading: true,
  login: async () => { throw new Error('Not implemented'); },
  register: async () => { throw new Error('Not implemented'); },
  logout: () => {},
});

const SESSION_KEY = 'autofix_current_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(SESSION_KEY);
      if (stored) {
        setCurrentUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string) => {
    setIsLoading(true);
    try {
      const user = await ApiClient.login(email, pass);
      setCurrentUser(user);
      // Note: Thay bằng cookie/JWT khi có backend thật
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
      return user;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: { name: string; email: string; phone?: string; password?: string }) => {
    setIsLoading(true);
    try {
      const user = await ApiClient.register(data);
      setCurrentUser(user);
      // Note: Thay bằng cookie/JWT khi có backend thật
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
      return user;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    // Note: Thay bằng cookie/JWT khi có backend thật
    sessionStorage.removeItem(SESSION_KEY);
  };

  return (
    <AuthContext.Provider value={{ currentUser, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
