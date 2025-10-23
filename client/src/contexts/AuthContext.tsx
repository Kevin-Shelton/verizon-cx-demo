import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  username: string;
  password: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  user: string | null;
  isAdmin: boolean;
  users: User[];
  addUser: (username: string, password: string) => boolean;
  deleteUser: (username: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Admin email - only this user can access admin panel
const ADMIN_EMAIL = 'kevin.shelton@invictusbpo.com';

// Default authorized users
const DEFAULT_USERS: User[] = [
  { username: 'kevin.shelton@invictusbpo.com', password: 'admin2024' },
  { username: 'admin', password: 'invictus2024' },
  { username: 'demo', password: 'demo123' },
  { username: 'verizon', password: 'verizon2024' },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>(DEFAULT_USERS);

  // Load users from localStorage on mount
  useEffect(() => {
    const storedUsers = localStorage.getItem('verizon_cx_users');
    if (storedUsers) {
      try {
        setUsers(JSON.parse(storedUsers));
      } catch (e) {
        console.error('Failed to load users from localStorage');
      }
    }

    const storedUser = localStorage.getItem('verizon_cx_user');
    const storedAuth = localStorage.getItem('verizon_cx_auth');
    
    if (storedUser && storedAuth === 'true') {
      setUser(storedUser);
      setIsAuthenticated(true);
    }
  }, []);

  // Save users to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('verizon_cx_users', JSON.stringify(users));
  }, [users]);

  const login = (username: string, password: string): boolean => {
    const foundUser = users.find(u => u.username === username && u.password === password);
    
    if (foundUser) {
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

  const addUser = (username: string, password: string): boolean => {
    // Check if user already exists
    if (users.find(u => u.username === username)) {
      return false;
    }

    setUsers([...users, { username, password }]);
    return true;
  };

  const deleteUser = (username: string): boolean => {
    // Prevent deleting the admin user
    if (username === ADMIN_EMAIL) {
      return false;
    }

    setUsers(users.filter(u => u.username !== username));
    return true;
  };

  const isAdmin = user === ADMIN_EMAIL;

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      login, 
      logout, 
      user, 
      isAdmin,
      users,
      addUser,
      deleteUser
    }}>
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

