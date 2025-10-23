import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, UserPlus, Trash2, Shield, AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';

export default function Admin() {
  const { isAdmin, users, addUser, deleteUser, user } = useAuth();
  const [, setLocation] = useLocation();
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin) {
      setLocation('/');
    }
  }, [isAdmin, setLocation]);

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!newUsername || !newPassword) {
      setMessage({ type: 'error', text: 'Please enter both username and password' });
      return;
    }

    if (newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
      return;
    }

    const success = addUser(newUsername, newPassword);
    if (success) {
      setMessage({ type: 'success', text: `User "${newUsername}" added successfully` });
      setNewUsername('');
      setNewPassword('');
    } else {
      setMessage({ type: 'error', text: `User "${newUsername}" already exists` });
    }
  };

  const handleDeleteUser = (username: string) => {
    if (username === 'kevin.shelton@invictusbpo.com') {
      setMessage({ type: 'error', text: 'Cannot delete admin user' });
      return;
    }

    if (confirm(`Are you sure you want to delete user "${username}"?`)) {
      const success = deleteUser(username);
      if (success) {
        setMessage({ type: 'success', text: `User "${username}" deleted successfully` });
      } else {
        setMessage({ type: 'error', text: 'Failed to delete user' });
      }
    }
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-10 h-10 text-purple-600" />
            <h1 className="text-4xl font-bold text-gray-900">Admin Panel</h1>
          </div>
          <p className="text-lg text-gray-600">
            Manage user access to the Verizon CX Demo Portal
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Logged in as: <span className="font-semibold text-purple-600">{user}</span>
          </p>
        </div>

        {/* Message Alert */}
        {message && (
          <div className={`mb-6 rounded-lg p-4 flex items-start gap-3 ${
            message.type === 'success' 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
            )}
            <p className={`text-sm ${
              message.type === 'success' ? 'text-green-800' : 'text-red-800'
            }`}>
              {message.text}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add User Card */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center gap-3">
                <UserPlus className="w-6 h-6 text-blue-600" />
                <CardTitle className="text-2xl">Add New User</CardTitle>
              </div>
              <CardDescription>
                Create a new user account with username and password
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleAddUser} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="username" className="text-sm font-medium text-gray-700">
                    Username / Email
                  </label>
                  <input
                    id="username"
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="user@example.com or username"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full pr-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Minimum 6 characters"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">Password must be at least 6 characters long</p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* User List Card */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-purple-600" />
                <CardTitle className="text-2xl">Current Users</CardTitle>
              </div>
              <CardDescription>
                {users.length} user{users.length !== 1 ? 's' : ''} with access to the portal
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {users.map((u) => (
                  <div
                    key={u.username}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900">{u.username}</p>
                        {u.username === 'kevin.shelton@invictusbpo.com' && (
                          <span className="px-2 py-1 text-xs font-semibold bg-purple-100 text-purple-700 rounded-full">
                            Admin
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 font-mono">
                        Password: {u.password.replace(/./g, '•')}
                      </p>
                    </div>
                    {u.username !== 'kevin.shelton@invictusbpo.com' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteUser(u.username)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info Section */}
        <Card className="mt-8 shadow-lg border-l-4 border-blue-500">
          <CardContent className="pt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Important Information</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Only you (kevin.shelton@invictusbpo.com) can access this admin panel</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Users are stored in browser localStorage and persist across sessions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>The admin account cannot be deleted for security</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>All users can access all pages once logged in</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>For production use, consider implementing a backend database for user storage</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

