import React, { useState, useEffect } from 'react';
import { X, Mail, User, DollarSign, ArrowRight, Check, Clock, Phone } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const { t } = useTranslation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    investmentRange: ''
  });

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set specific end date: April 25, 2025
    const endDate = new Date('2025-04-25T12:00:00');

    const timer = setInterval(() => {
      const now = new Date();
      const difference = endDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', investmentRange: '' });
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-0 sm:p-4">
      <div className="bg-white rounded-xl w-full h-full sm:h-auto sm:max-w-lg sm:max-h-[90vh] overflow-y-auto p-4 sm:p-8 relative">
        <button 
          onClick={onClose}
          className="absolute right-3 top-3 sm:right-4 sm:top-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        {!isSubmitted ? (
          <>
            <div className="text-center mb-6 sm:mb-8">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <DollarSign className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-4">
                {t('waitlist.title')}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                {t('waitlist.subtitle')}
              </p>

              {/* Countdown Timer */}
              <div className="bg-gray-50 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
                <div className="flex items-center justify-center gap-2 mb-3 text-orange-500">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-sm sm:text-base font-medium">{t('waitlist.launchDate')}</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { value: timeLeft.days, label: t('waitlist.timer.days') },
                    { value: timeLeft.hours, label: t('waitlist.timer.hours') },
                    { value: timeLeft.minutes, label: t('waitlist.timer.minutes') },
                    { value: timeLeft.seconds, label: t('waitlist.timer.seconds') }
                  ].map((item, index) => (
                    <div key={index} className="bg-white p-2 sm:p-3 rounded-lg shadow-sm">
                      <div className="text-lg sm:text-2xl font-bold text-gray-900">
                        {item.value}
                      </div>
                      <div className="text-[10px] sm:text-xs text-gray-500">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 pb-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={t('waitlist.form.fullName')}
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-9 sm:pl-11 pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all shadow-sm"
                />
              </div>
              
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                <input
                  type="email"
                  placeholder={t('waitlist.form.email')}
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-9 sm:pl-11 pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all shadow-sm"
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                <input
                  type="tel"
                  placeholder={t('waitlist.form.phone')}
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-9 sm:pl-11 pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all shadow-sm"
                  pattern="[0-9+\-\s]+"
                  title={t('waitlist.form.phoneInvalid')}
                />
              </div>
              
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                <select 
                  required
                  value={formData.investmentRange}
                  onChange={(e) => setFormData({ ...formData, investmentRange: e.target.value })}
                  className="w-full pl-9 sm:pl-11 pr-8 py-2.5 sm:py-3 text-sm sm:text-base bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all shadow-sm appearance-none"
                >
                  <option value="">{t('waitlist.form.ranges.select')}</option>
                  <option value="0-50k">{t('waitlist.form.ranges.range1')}</option>
                  <option value="50k-100k">{t('waitlist.form.ranges.range2')}</option>
                  <option value="100k-250k">{t('waitlist.form.ranges.range3')}</option>
                  <option value="250k+">{t('waitlist.form.ranges.range4')}</option>
                </select>
                <ArrowRight className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </div>

              <button 
                type="submit"
                className="w-full py-2.5 sm:py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                {t('waitlist.form.submit')}
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>

              <div className="space-y-2 sm:space-y-4 pt-3 sm:pt-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">{t('waitlist.benefits.earlyAccess')}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">{t('waitlist.benefits.exclusive')}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">{t('waitlist.benefits.priority')}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-gray-500 text-center">
                {t('waitlist.disclaimer')}
              </p>
            </form>
          </>
        ) : (
          <div className="text-center h-full flex flex-col items-center justify-center py-6 sm:py-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Check className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              {t('waitlist.success.title')}
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              {t('waitlist.success.message')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 