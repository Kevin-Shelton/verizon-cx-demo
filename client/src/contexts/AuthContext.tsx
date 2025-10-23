import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  user: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Authorized users - you can modify this list or move to environment variables
const AUTHORIZED_USERS = {
  'admin': 'invictus2024',
  'demo': 'demo123',
  'verizon': 'verizon2024',
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<string | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('verizon_cx_user');
    const storedAuth = localStorage.getItem('verizon_cx_auth');
    
    if (storedUser && storedAuth === 'true') {
      setUser(storedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    // Check if credentials match
    if (AUTHORIZED_USERS[username as keyof typeof AUTHORIZED_USERS] === password) {
      setIsAuthenticated(true);
      setUser(username);
      localStorage.setItem('verizon_cx_user', username);
      localStorage.setItem('verizon_cx_auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('verizon_cx_user');
    localStorage.removeItem('verizon_cx_auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

