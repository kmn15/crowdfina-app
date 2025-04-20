import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Camera, Save, Bell, Lock } from 'lucide-react';
import DashboardSidebar from './DashboardSidebar';
import Notification from './Notification';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  avatar: string;
  privacy: {
    showEmail: boolean;
    showPhone: boolean;
    showInvestments: boolean;
    showProfits: boolean;
  };
  notifications: {
    email: {
      investments: boolean;
      profits: boolean;
      news: boolean;
      marketing: boolean;
    };
    push: {
      investments: boolean;
      profits: boolean;
      news: boolean;
      marketing: boolean;
    };
  };
}

export default function ProfileSettings() {
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const [profile, setProfile] = useState<UserProfile>({
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Investment Street',
    city: 'New York',
    country: 'United States',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    privacy: {
      showEmail: true,
      showPhone: false,
      showInvestments: true,
      showProfits: false
    },
    notifications: {
      email: {
        investments: true,
        profits: true,
        news: false,
        marketing: false
      },
      push: {
        investments: true,
        profits: true,
        news: true,
        marketing: false
      }
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // API call would go here
      console.log('Profile updated:', profile);
      setNotification({
        type: 'success',
        message: 'Profile updated successfully!'
      });
    } catch {
      setNotification({
        type: 'error',
        message: 'Failed to update profile. Please try again.'
      });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({
          ...prev,
          avatar: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile Settings</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your account information</p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-4xl">
            {/* Avatar Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center gap-8">
                <div className="relative">
                  <img
                    src={profile.avatar}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 p-1.5 bg-orange-500 text-white rounded-full cursor-pointer hover:bg-orange-600 transition-colors"
                  >
                    <Camera className="h-4 w-4" />
                  </label>
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Profile Picture</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Upload a new profile picture</p>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                    <input
                      type="text"
                      value={profile.firstName}
                      onChange={(e) => setProfile(prev => ({ ...prev, firstName: e.target.value }))}
                      className="w-full pl-11 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="First Name"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Last Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                    <input
                      type="text"
                      value={profile.lastName}
                      onChange={(e) => setProfile(prev => ({ ...prev, lastName: e.target.value }))}
                      className="w-full pl-11 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full pl-11 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Email Address"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full pl-11 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Phone Number"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Address Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Street Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                    <input
                      type="text"
                      value={profile.address}
                      onChange={(e) => setProfile(prev => ({ ...prev, address: e.target.value }))}
                      className="w-full pl-11 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Street Address"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    value={profile.city}
                    onChange={(e) => setProfile(prev => ({ ...prev, city: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    value={profile.country}
                    onChange={(e) => setProfile(prev => ({ ...prev, country: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Country"
                  />
                </div>
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center gap-2 mb-6">
                <Lock className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Privacy Settings</h2>
              </div>
              <div className="space-y-4">
                {[
                  { key: 'showEmail', label: 'Show email to other investors' },
                  { key: 'showPhone', label: 'Show phone number on profile' },
                  { key: 'showInvestments', label: 'Show my investments publicly' },
                  { key: 'showProfits', label: 'Display profit statistics' }
                ].map((setting) => (
                  <div key={setting.key} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{setting.label}</span>
                    <button
                      type="button"
                      onClick={() => setProfile(prev => ({
                        ...prev,
                        privacy: {
                          ...prev.privacy,
                          [setting.key]: !prev.privacy[setting.key as keyof UserProfile['privacy']]
                        }
                      }))}
                      className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
                      style={{
                        backgroundColor: profile.privacy[setting.key as keyof UserProfile['privacy']] 
                          ? '#f97316' 
                          : '#e5e7eb'
                      }}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          profile.privacy[setting.key as keyof UserProfile['privacy']] ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center gap-2 mb-6">
                <Bell className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Notification Preferences</h2>
              </div>
              
              {/* Email Notifications */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Email Notifications</h3>
                <div className="space-y-4">
                  {[
                    { key: 'investments', label: 'Investment updates and opportunities' },
                    { key: 'profits', label: 'Profit distributions and reports' },
                    { key: 'news', label: 'Platform news and updates' },
                    { key: 'marketing', label: 'Marketing and promotional offers' }
                  ].map((setting) => (
                    <div key={setting.key} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 dark:text-gray-300">{setting.label}</span>
                      <button
                        type="button"
                        onClick={() => setProfile(prev => ({
                          ...prev,
                          notifications: {
                            ...prev.notifications,
                            email: {
                              ...prev.notifications.email,
                              [setting.key]: !prev.notifications.email[setting.key as keyof UserProfile['notifications']['email']]
                            }
                          }
                        }))}
                        className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
                        style={{
                          backgroundColor: profile.notifications.email[setting.key as keyof UserProfile['notifications']['email']] 
                            ? '#f97316' 
                            : '#e5e7eb'
                        }}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            profile.notifications.email[setting.key as keyof UserProfile['notifications']['email']] 
                              ? 'translate-x-6' 
                              : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Push Notifications */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Push Notifications</h3>
                <div className="space-y-4">
                  {[
                    { key: 'investments', label: 'Investment updates and opportunities' },
                    { key: 'profits', label: 'Profit distributions and reports' },
                    { key: 'news', label: 'Platform news and updates' },
                    { key: 'marketing', label: 'Marketing and promotional offers' }
                  ].map((setting) => (
                    <div key={setting.key} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 dark:text-gray-300">{setting.label}</span>
                      <button
                        type="button"
                        onClick={() => setProfile(prev => ({
                          ...prev,
                          notifications: {
                            ...prev.notifications,
                            push: {
                              ...prev.notifications.push,
                              [setting.key]: !prev.notifications.push[setting.key as keyof UserProfile['notifications']['push']]
                            }
                          }
                        }))}
                        className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
                        style={{
                          backgroundColor: profile.notifications.push[setting.key as keyof UserProfile['notifications']['push']] 
                            ? '#f97316' 
                            : '#e5e7eb'
                        }}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            profile.notifications.push[setting.key as keyof UserProfile['notifications']['push']] 
                              ? 'translate-x-6' 
                              : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
            >
              <Save className="h-5 w-5" />
              Save Changes
            </button>
          </form>
        </main>
      </div>
    </div>
  );
} 