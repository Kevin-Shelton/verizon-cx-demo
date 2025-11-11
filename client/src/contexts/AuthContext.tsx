import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  user: string | null;
  isAdmin: boolean;
  users: User[];
  addUser: (email: string, password: string) => Promise<boolean>;
  deleteUser: (email: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Admin email - only this user can access admin panel
const ADMIN_EMAIL = 'kevin.shelton@invictusbpo.com';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  // Fetch users from tRPC endpoint
  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/trpc/auth.listUsers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          json: {},
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.result?.data && Array.isArray(data.result.data)) {
          setUsers(data.result.data);
        }
      } else {
        console.error('Error fetching users:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Load users on mount and check session
  useEffect(() => {
    fetchUsers();

    // Check if user is already logged in (e.g., from a previous session)
    const storedUser = localStorage.getItem('verizon_cx_user');
    const storedAuth = localStorage.getItem('verizon_cx_auth');
    
    if (storedUser && storedAuth === 'true') {
      setUser(storedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log('Login attempt:', email, 'Password length:', password.length);
    
    try {
      console.log('Calling tRPC login endpoint with email:', email);
      
      // Call the tRPC login endpoint
      const response = await fetch('/api/trpc/auth.login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          json: {
            email: email,
            password: password,
          },
        }),
      });

      console.log('Response status:', response.status);
      
      const responseData = await response.json();
      console.log('Response data:', responseData);

      if (response.ok && responseData.result?.data?.success) {
        const { token, user: userData } = responseData.result.data;
        console.log('Login successful, storing token and redirecting');
        setIsAuthenticated(true);
        setUser(email);
        localStorage.setItem('verizon_cx_user', email);
        localStorage.setItem('verizon_cx_auth', 'true');
        localStorage.setItem('authToken', token);
        return true;
      } else {
        const errorMessage = responseData.result?.data?.error || responseData.error?.message || 'Unknown error';
        console.error('Login error from backend:', errorMessage);
        return false;
      }
    } catch (error) {
      console.error('Login request failed:', error);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('verizon_cx_user');
    localStorage.removeItem('verizon_cx_auth');
    localStorage.removeItem('authToken');
  };

  const addUser = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('Adding user via tRPC:', email);
      
      const response = await fetch('/api/trpc/auth.addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          json: {
            email: email,
            password: password,
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.result?.data?.success) {
          console.log('User added successfully');
          await fetchUsers(); // Refresh user list
          return true;
        }
      }
      
      console.error('Error adding user:', response.statusText);
      return false;
    } catch (error) {
      console.error('Error adding user:', error);
      return false;
    }
  };

  const deleteUser = async (email: string): Promise<boolean> => {
    // Prevent deleting the admin user
    if (email === ADMIN_EMAIL) {
      console.warn('Attempted to delete admin user:', email);
      return false;
    }

    try {
      console.log('Deleting user via tRPC:', email);
      
      const response = await fetch('/api/trpc/auth.deleteUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          json: {
            email: email,
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.result?.data?.success) {
          console.log('User deleted successfully');
          await fetchUsers(); // Refresh user list
          return true;
        }
      }

      console.error('Error deleting user:', response.statusText);
      return false;
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
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
