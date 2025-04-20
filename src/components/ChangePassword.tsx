import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import DashboardSidebar from './DashboardSidebar';
import Notification from './Notification';

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ChangePassword() {
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [formData, setFormData] = useState<PasswordForm>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const validatePassword = (password: string): boolean => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialChar
    );
  };

  const calculatePasswordStrength = (password: string): number => {
    if (!password) return 0;
    
    let strength = 0;
    passwordRequirements.forEach(req => {
      if (req.test(password)) strength++;
    });
    return (strength / passwordRequirements.length) * 100;
  };

  const getStrengthColor = (strength: number): string => {
    if (strength < 40) return 'bg-red-500 dark:bg-red-600';
    if (strength < 80) return 'bg-yellow-500 dark:bg-yellow-600';
    return 'bg-green-500 dark:bg-green-600';
  };

  const getStrengthText = (strength: number): string => {
    if (strength < 40) return 'Weak';
    if (strength < 80) return 'Medium';
    return 'Strong';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate current password is not empty
    if (!formData.currentPassword) {
      setNotification({
        type: 'error',
        message: 'Please enter your current password'
      });
      return;
    }

    // Validate new password meets requirements
    if (!validatePassword(formData.newPassword)) {
      setNotification({
        type: 'error',
        message: 'New password does not meet security requirements'
      });
      return;
    }

    // Validate passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      setNotification({
        type: 'error',
        message: 'New passwords do not match'
      });
      return;
    }

    // Handle password change
    try {
      // API call would go here
      console.log('Password change:', formData);
      setNotification({
        type: 'success',
        message: 'Password changed successfully!'
      });
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch {
      setNotification({
        type: 'error',
        message: 'Failed to change password. Please try again.'
      });
    }
  };

  const passwordRequirements = [
    { label: 'At least 8 characters', test: (pwd: string) => pwd.length >= 8 },
    { label: 'Contains uppercase letter', test: (pwd: string) => /[A-Z]/.test(pwd) },
    { label: 'Contains lowercase letter', test: (pwd: string) => /[a-z]/.test(pwd) },
    { label: 'Contains number', test: (pwd: string) => /\d/.test(pwd) },
    { label: 'Contains special character', test: (pwd: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd) }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar />
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
      <div className="pl-64">
        <main className="p-8 pt-24">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Change Password</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Update your account password</p>
          </div>

          <div className="max-w-xl">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              {/* Current Password */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                  <input
                    type={showPasswords.current ? "text" : "password"}
                    value={formData.currentPassword}
                    onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                    className="w-full pl-11 pr-12 py-2.5 border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
                  >
                    {showPasswords.current ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                  <input
                    type={showPasswords.new ? "text" : "password"}
                    value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                    className="w-full pl-11 pr-12 py-2.5 border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
                  >
                    {showPasswords.new ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>

                {/* Password Strength Meter */}
                {formData.newPassword && (
                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Password Strength:</span>
                      <span className="text-sm font-medium dark:text-gray-300">
                        {getStrengthText(calculatePasswordStrength(formData.newPassword))}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${getStrengthColor(
                          calculatePasswordStrength(formData.newPassword)
                        )}`}
                        style={{
                          width: `${calculatePasswordStrength(formData.newPassword)}%`
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Password Requirements */}
                <div className="mt-3 space-y-2">
                  {passwordRequirements.map((req, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-2 text-sm ${
                        req.test(formData.newPassword)
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        req.test(formData.newPassword)
                          ? 'bg-green-600 dark:bg-green-400'
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`} />
                      {req.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Confirm New Password */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                  <input
                    type={showPasswords.confirm ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full pl-11 pr-12 py-2.5 border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
                  >
                    {showPasswords.confirm ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
              >
                <Lock className="h-5 w-5" />
                Change Password
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
} 