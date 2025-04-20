import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Eye, EyeOff, User, Phone } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

export default function SignupPage() {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    terms: false
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
    console.log('Signup attempt with:', formData);
    
    // Simulate successful signup
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {t('signup.title')}
            </h1>
            <p className="text-gray-600">{t('signup.subtitle')}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name Input */}
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={t('signup.form.fullName')}
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all shadow-sm"
              />
            </div>

            {/* Email Input */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                placeholder={t('signup.form.email')}
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all shadow-sm"
              />
            </div>

            {/* Phone Input */}
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="tel"
                placeholder={t('signup.form.phone')}
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all shadow-sm"
                pattern="[0-9+\-\s]+"
                title={t('signup.form.phoneInvalid')}
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder={t('signup.form.password')}
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 pr-12 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder={t('signup.form.confirmPassword')}
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full pl-10 pr-12 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start">
              <input
                type="checkbox"
                required
                checked={formData.terms}
                onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
                className="mt-1 w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
              />
              <span className="ml-2 text-sm text-gray-600">
                {t('signup.form.terms')}
              </span>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {t('signup.form.submit')}
              <ArrowRight className="h-5 w-5" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">
                {t('signup.form.orContinueWith')}
              </span>
            </div>
          </div>

          {/* Social Signup Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
                />
                <path
                  fill="#34A853"
                  d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09C3.515 21.3 7.565 24 12.255 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62h-3.98a11.86 11.86 0 000 10.76l3.98-3.09z"
                />
                <path
                  fill="#EA4335"
                  d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0c-4.69 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
                />
              </svg>
              <span className="text-sm font-medium">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <path
                  fill="currentColor"
                  d="M17.05 20.28c-.98.95-2.05.88-3.08.41-1.07-.47-2.05-.48-3.18 0-1.42.61-2.16.52-3.03-.41C2.86 14.86 3.64 6.18 9.28 5.93c1.46-.07 2.54.53 3.37.53.83 0 2.37-.66 4.01-.56 1.09.04 4.16.44 4.16 4.2-.11 3.32-2.9 4.97-2.9 4.97-.77 1.18-1.14 2.27-1.87 5.21zM12.01 5.88c-.3-2.47 1.67-4.83 4.29-4.83.14 2.1-1.5 4.82-4.29 4.83z"
                />
              </svg>
              <span className="text-sm font-medium">Apple</span>
            </button>
          </div>

          {/* Login Link */}
          <p className="mt-8 text-center text-sm text-gray-600">
            {t('signup.haveAccount')}{' '}
            <Link to="/login" className="text-orange-500 hover:text-orange-600 font-medium">
              {t('signup.login')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 