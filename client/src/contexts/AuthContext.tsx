import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClient } from '@supabase/supabase-js';

interface User {
  username: string;
  password: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  user: string | null;
  isAdmin: boolean;
  users: User[];
  addUser: (username: string, password: string) => Promise<boolean>;
  deleteUser: (username: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Admin email - only this user can access admin panel
const ADMIN_EMAIL = 'kevin.shelton@invictusbpo.com';

// Supabase Client
const supabaseUrl = import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_TOKEN;

// Check if environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is not defined. Please check your .env file.');
  // Fallback to a non-functional supabase client to prevent crashes
  // In a real app, you might want to throw an error or handle this more gracefully
}

const supabase = createClient(supabaseUrl || 'http://localhost', supabaseAnonKey || 'dummy_key');

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]); // Initialize as empty, will fetch from Supabase

  // Load users from Supabase on mount and check session
  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from('users').select('*');
      if (error) {
        console.error('Error fetching users:', error.message);
      } else if (data) {
        setUsers(data as User[]);
      }
    };

    fetchUsers();

    // Check if user is already logged in (e.g., from a previous session)
    const storedUser = localStorage.getItem('verizon_cx_user');
    const storedAuth = localStorage.getItem('verizon_cx_auth');
    
    if (storedUser && storedAuth === 'true') {
      setUser(storedUser);
      setIsAuthenticated(true);
    }
  }, []);

  // No longer saving users to localStorage, as they are managed in Supabase

  const login = async (username: string, password: string): Promise<boolean> => {
    const { data, error } = await supabase.from('users').select('*').eq('username', username).eq('password', password);

    if (error) {
      console.error('Supabase login error:', error.message);
      return false;
    }

    if (data && data.length > 0) {
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

  const addUser = async (username: string, password: string): Promise<boolean> => {
    // Check if user already exists in Supabase
    const { data: existingUsers, error: fetchError } = await supabase.from('users').select('username').eq('username', username);
    if (fetchError) {
      console.error('Error checking existing user:', fetchError.message);
      return false;
    }
    if (existingUsers && existingUsers.length > 0) {
      console.warn('User already exists:', username);
      return false;
    }

    const { data, error } = await supabase.from('users').insert([{ username, password }]);

    if (error) {
      console.error('Error adding user:', error.message);
      return false;
    }

    if (data) {
      // Re-fetch users to update the local state
      const { data: updatedUsers, error: updateError } = await supabase.from('users').select('*');
      if (updateError) {
        console.error('Error refetching users after add:', updateError.message);
      } else if (updatedUsers) {
        setUsers(updatedUsers as User[]);
      }
      return true;
    }
    return false;
  };

  const deleteUser = async (username: string): Promise<boolean> => {
    // Prevent deleting the admin user
    if (username === ADMIN_EMAIL) {
      console.warn('Attempted to delete admin user:', username);
      return false;
    }

    const { error } = await supabase.from('users').delete().eq('username', username);

    if (error) {
      console.error('Error deleting user:', error.message);
      return false;
    }

    // Re-fetch users to update the local state
    const { data: updatedUsers, error: updateError } = await supabase.from('users').select('*');
    if (updateError) {
      console.error('Error refetching users after delete:', updateError.message);
    } else if (updatedUsers) {
      setUsers(updatedUsers as User[]);
    }
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
