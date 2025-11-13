import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Users, UserPlus, Trash2, AlertCircle, CheckCircle, Eye, EyeOff, BarChart3, Lock, RotateCcw, RefreshCw, Copy, Check } from 'lucide-react';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  password_status: string;
  created_by: string;
  createdAt: string;
  accountStatus?: string;
  activationDisplayStatus?: string;
  activatedAt?: string;
  needsNewLink?: boolean;
  token?: {
    id: string;
    status: string;
    expiresAt: string;
    secondsUntilExpiration: number;
  };
}

export default function Admin() {
  const [activeTab, setActiveTab] = useState<'users' | 'metrics'>('users');
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordCopied, setPasswordCopied] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch all users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      
      // Try to fetch with activation status first
      let response = await fetch('/api/admin/users/activation-status', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      // Fallback to old endpoint if activation-status not available
      if (!response.ok) {
        response = await fetch('/api/admin/users/list', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
      }

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      setMessage({ type: 'error', text: 'Failed to load users' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!newEmail) {
      setMessage({ type: 'error', text: 'Please enter an email address' });
      return;
    }

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/admin/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: newEmail,
          name: newName || undefined, // Optional: use email prefix if not provided
          createdBy: 'admin',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage({ type: 'error', text: data.error || 'Failed to create user' });
        return;
      }

      setMessage({ type: 'success', text: `User "${newEmail}" created! Activation email sent with password setup link.` });
      setNewEmail('');
      setNewName('');
      
      // Refresh user list
      await fetchUsers();
    } catch (error) {
      console.error('Error creating user:', error);
      setMessage({ type: 'error', text: 'Failed to create user' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async (userId: string, userEmail: string) => {
    if (!window.confirm(`Are you sure you want to delete ${userEmail}?`)) {
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/admin/users/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage({ type: 'error', text: data.error || 'Failed to delete user' });
        return;
      }

      setMessage({ type: 'success', text: `User ${userEmail} deleted successfully` });
      await fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      setMessage({ type: 'error', text: 'Failed to delete user' });
    }
  };

  const handleResendActivation = async (userId: string, userEmail: string) => {
    if (!window.confirm(`Resend activation link to ${userEmail}? This will invalidate any previous links.`)) {
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/admin/users/resend-activation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage({ type: 'error', text: data.error || 'Failed to resend activation link' });
        return;
      }

      setMessage({ type: 'success', text: `Activation link resent to ${userEmail}` });
      await fetchUsers();
    } catch (error) {
      console.error('Error resending activation:', error);
      setMessage({ type: 'error', text: 'Failed to resend activation link' });
    }
  };

  const handleResetPassword = async (userId: string, userEmail: string) => {
    if (!window.confirm(`Reset password for ${userEmail}? They will need to set a new password on next login.`)) {
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/admin/users/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage({ type: 'error', text: data.error || 'Failed to reset password' });
        return;
      }

      setMessage({ type: 'success', text: `Password reset for ${userEmail}` });
      await fetchUsers();
    } catch (error) {
      console.error('Error resetting password:', error);
      setMessage({ type: 'error', text: 'Failed to reset password' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Shield className="w-10 h-10 text-purple-600" />
              <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <Link href="/">
              <Button className="bg-gray-600 hover:bg-gray-700">
                Back to Portal
              </Button>
            </Link>
          </div>
          <p className="text-lg text-gray-600">
            Manage users, monitor system health, and view security metrics
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'users'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Users className="w-4 h-4 inline mr-2" />
            User Management
          </button>
          <button
            onClick={() => setActiveTab('metrics')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'metrics'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <BarChart3 className="w-4 h-4 inline mr-2" />
            Security Metrics
          </button>
        </div>

        {/* Message Alert */}
        {message && (
          <div
            className={`mb-6 rounded-lg p-4 flex items-start gap-3 ${
              message.type === 'success'
                ? 'bg-green-50 border border-green-200'
                : 'bg-red-50 border border-red-200'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
            )}
            <p
              className={`text-sm ${
                message.type === 'success' ? 'text-green-800' : 'text-red-800'
              }`}
            >
              {message.text}
            </p>
          </div>
        )}

        {/* User Management Tab */}
        {activeTab === 'users' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Add User Card */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex items-center gap-3">
                  <UserPlus className="w-6 h-6 text-blue-600" />
                  <CardTitle className="text-2xl">Add New User</CardTitle>
                </div>
                <CardDescription>
                  Create a new user account for portal access
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleAddUser} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="user@example.com"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700">
                      Full Name <span className="text-gray-400 text-xs">(Optional)</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="John Doe (defaults to email prefix)"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800 font-medium mb-1">
                      🔐 Password Setup via Email
                    </p>
                    <p className="text-xs text-blue-700">
                      The user will receive an email with a secure activation link to set their own password. The link expires in 24 hours.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    {isSubmitting ? 'Adding...' : 'Add User'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Current Users Card */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-purple-600" />
                  <CardTitle className="text-2xl">Current Users</CardTitle>
                </div>
                <CardDescription>
                  {isLoading ? 'Loading...' : `${users.length} active portal users`}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {isLoading ? (
                    <div className="text-center py-8 text-gray-500">
                      <p>Loading users...</p>
                    </div>
                  ) : users.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Lock className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No users found</p>
                    </div>
                  ) : (
                    users.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-900 text-sm">{user.email || user.name || 'Unknown'}</p>
                            {user.role === 'admin' && (
                              <span className="px-2 py-1 text-xs font-semibold bg-purple-100 text-purple-700 rounded-full">
                                Admin
                              </span>
                            )}
                            {/* Activation status badges */}
                            {user.accountStatus === 'active' && (
                              <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" />
                                Activated
                              </span>
                            )}
                            {user.accountStatus === 'pending_activation' && user.token?.status === 'pending' && (
                              <span className="px-2 py-1 text-xs font-semibold bg-yellow-100 text-yellow-700 rounded-full">
                                ⏳ Pending
                              </span>
                            )}
                            {user.accountStatus === 'pending_activation' && user.needsNewLink && (
                              <span className="px-2 py-1 text-xs font-semibold bg-red-100 text-red-700 rounded-full">
                                ⚠️ Link Expired
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {user.name || 'No name'}
                            {user.activatedAt && (
                              <span className="ml-2">• Activated {new Date(user.activatedAt).toLocaleDateString()}</span>
                            )}
                          </p>
                        </div>
                        {user.role !== 'admin' && (
                          <div className="flex gap-2">
                            {/* Show resend button if user needs new link */}
                            {user.needsNewLink && (
                              <button
                                onClick={() => handleResendActivation(user.id, user.email || user.name || 'Unknown')}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                                title="Resend activation link"
                              >
                                <RefreshCw className="w-4 h-4" />
                              </button>
                            )}
                            {/* Show reset password only for activated users */}
                            {user.accountStatus === 'active' && (
                              <button
                                onClick={() => handleResetPassword(user.id, user.email || user.name || 'Unknown')}
                                className="p-2 text-orange-600 hover:bg-orange-50 rounded transition"
                                title="Reset password"
                              >
                                <RotateCcw className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteUser(user.id, user.email || user.name || 'Unknown')}
                              className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                              title="Delete user"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Security Metrics Tab */}
        {activeTab === 'metrics' && (
          <div className="space-y-6">
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="shadow-md">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Total Login Attempts</p>
                    <p className="text-3xl font-bold text-gray-900">0</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Failed Attempts</p>
                    <p className="text-3xl font-bold text-red-600">0</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Blocked IPs</p>
                    <p className="text-3xl font-bold text-orange-600">0</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Block Rate</p>
                    <p className="text-3xl font-bold text-gray-900">0%</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Metrics */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
                <CardTitle className="text-2xl">Rate Limiting Events</CardTitle>
                <CardDescription>
                  Recent security events and blocked attempts
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="text-center py-12 text-gray-500">
                  <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">No rate limiting events recorded</p>
                </div>
              </CardContent>
            </Card>

            {/* Top Blocked IPs */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50">
                <CardTitle className="text-2xl">Top Blocked IP Addresses</CardTitle>
                <CardDescription>
                  IP addresses with the most failed attempts
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="text-center py-12 text-gray-500">
                  <Lock className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">No blocked IP addresses</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Info Section */}
        <Card className="mt-8 shadow-lg border-l-4 border-blue-500">
          <CardContent className="pt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Security Information</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>All passwords are hashed with bcrypt (10 rounds) for security</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Failed login attempts are tracked and rate-limited (5 attempts per 15 minutes)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Google reCAPTCHA v3 is triggered after 3 failed login attempts</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>JWT tokens expire after 24 hours for enhanced security</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>All user data is stored securely in Supabase PostgreSQL database</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

