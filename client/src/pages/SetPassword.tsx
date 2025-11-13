import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Eye, EyeOff, CheckCircle, XCircle, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SetPassword() {
  const [location, setLocation] = useLocation();
  
  // Parse token from URL query string
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');

  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [tokenValid, setTokenValid] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password strength indicators
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    strength: 0
  });

  // Verify token on mount
  useEffect(() => {
    if (!token) {
      setError('No activation token provided');
      setVerifying(false);
      setLoading(false);
      return;
    }

    verifyToken();
  }, [token]);

  // Update password strength as user types
  useEffect(() => {
    const length = password.length >= 8;
    const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);
    const number = /[0-9]/.test(password);
    
    let strength = 0;
    if (length) strength++;
    if (uppercase) strength++;
    if (lowercase) strength++;
    if (number) strength++;

    setPasswordStrength({ length, uppercase, lowercase, number, strength });
  }, [password]);

  const verifyToken = async () => {
    try {
      const response = await fetch('/api/auth/verify-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (response.ok && data.valid) {
        setTokenValid(true);
        setUser(data.user);
      } else {
        setTokenValid(false);
        setError(data.message || data.error || 'Invalid or expired activation link');
      }
    } catch (err) {
      setTokenValid(false);
      setError('Failed to verify activation link. Please try again.');
    } finally {
      setVerifying(false);
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password strength
    if (!passwordStrength.length || !passwordStrength.uppercase || 
        !passwordStrength.lowercase || !passwordStrength.number) {
      setError('Password does not meet requirements');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/auth/set-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(true);
        
        // Store session token and user info using the correct keys
        if (data.sessionToken) {
          localStorage.setItem('authToken', data.sessionToken);
        }
        
        // Store user info for AuthContext
        if (data.user && data.user.email) {
          localStorage.setItem('verizon_cx_user', data.user.email);
          localStorage.setItem('verizon_cx_auth', 'true');
        }

        // Redirect to videos page after 2 seconds
        setTimeout(() => {
          window.location.href = '/videos';
        }, 2000);
      } else {
        setError(data.message || data.error || 'Failed to set password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength.strength === 4) return 'bg-green-500';
    if (passwordStrength.strength === 3) return 'bg-yellow-500';
    if (passwordStrength.strength === 2) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getStrengthText = () => {
    if (passwordStrength.strength === 4) return 'Strong';
    if (passwordStrength.strength === 3) return 'Good';
    if (passwordStrength.strength === 2) return 'Fair';
    if (passwordStrength.strength === 1) return 'Weak';
    return 'Very Weak';
  };

  // Loading state
  if (loading || verifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Verifying activation link...</p>
        </div>
      </div>
    );
  }

  // Success state
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Password Set Successfully!
          </h1>
          <p className="text-gray-600 mb-4">
            Your account has been activated. Redirecting to dashboard...
          </p>
          <Loader2 className="h-6 w-6 animate-spin text-blue-600 mx-auto" />
        </div>
      </div>
    );
  }

  // Error state (invalid/expired token)
  if (!tokenValid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            Invalid Activation Link
          </h1>
          <p className="text-gray-600 mb-6 text-center">
            {error}
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-800">
              <strong>Need help?</strong> Contact your administrator to request a new activation link.
            </p>
          </div>
          <Button
            onClick={() => setLocation('/login')}
            className="w-full"
          >
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  // Set password form
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Set Your Password
          </h1>
          <p className="text-gray-600">
            Welcome, <strong>{user?.name}</strong>!
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {user?.email}
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            Create a secure password to activate your iKoneworld account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Password field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
                disabled={submitting}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                disabled={submitting}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {/* Password strength indicator */}
            {password && (
              <div className="mt-2">
                <div className="flex gap-1 mb-2">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`h-1 flex-1 rounded ${
                        level <= passwordStrength.strength ? getStrengthColor() : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <p className={`text-xs font-medium ${
                  passwordStrength.strength >= 3 ? 'text-green-600' : 'text-orange-600'
                }`}>
                  Password strength: {getStrengthText()}
                </p>
              </div>
            )}
          </div>

          {/* Confirm password field */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Confirm your password"
                disabled={submitting}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                disabled={submitting}
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {confirmPassword && password !== confirmPassword && (
              <p className="text-xs text-red-600 mt-1">Passwords do not match</p>
            )}
          </div>

          {/* Password requirements */}
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Password requirements:</p>
            <ul className="space-y-1">
              <li className={`text-xs flex items-center gap-2 ${
                passwordStrength.length ? 'text-green-600' : 'text-gray-500'
              }`}>
                {passwordStrength.length ? <CheckCircle className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                At least 8 characters
              </li>
              <li className={`text-xs flex items-center gap-2 ${
                passwordStrength.uppercase ? 'text-green-600' : 'text-gray-500'
              }`}>
                {passwordStrength.uppercase ? <CheckCircle className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                One uppercase letter
              </li>
              <li className={`text-xs flex items-center gap-2 ${
                passwordStrength.lowercase ? 'text-green-600' : 'text-gray-500'
              }`}>
                {passwordStrength.lowercase ? <CheckCircle className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                One lowercase letter
              </li>
              <li className={`text-xs flex items-center gap-2 ${
                passwordStrength.number ? 'text-green-600' : 'text-gray-500'
              }`}>
                {passwordStrength.number ? <CheckCircle className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                One number
              </li>
            </ul>
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Submit button */}
          <Button
            type="submit"
            disabled={submitting || !password || !confirmPassword || password !== confirmPassword}
            className="w-full"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Setting Password...
              </>
            ) : (
              'Set Password and Log In'
            )}
          </Button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-6">
          By setting your password, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
