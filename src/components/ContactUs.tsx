import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

export default function ContactUs() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: t('contact.office.phone'),
      value: "+44 20 1234 5678",
      link: "tel:+442012345678"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: t('contact.office.email'),
      value: "support@crowdfina.com",
      link: "mailto:support@crowdfina.com"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: t('contact.office.address'),
      value: "123 Main Street, London",
      link: "https://maps.google.com/?q=123+Main+Street+London"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 dark:text-white">
      {/* Hero Section */}
      <section className="bg-white dark:bg-gray-800 py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t('contact.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t('contact.form.send')}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('contact.form.name')}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                      placeholder={t('contact.form.name')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('contact.form.email')}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('contact.form.subject')}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                    placeholder={t('contact.form.subject')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all resize-none"
                    placeholder={t('contact.form.message')}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  {t('contact.form.send')}
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="lg:pl-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                {t('contact.office.title')}
              </h2>
              <div className="space-y-8 mb-12">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.link}
                    className="flex items-start gap-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="text-orange-500 dark:text-orange-400">
                        {info.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                        {info.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {info.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Map */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-2">
                <iframe
                  title="Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.542356599117!2d-0.12985968422955556!3d51.50736731882345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604ce3941eb1f%3A0x1a5342fdf089c627!2sTrafalgar%20Square!5e0!3m2!1sen!2suk!4v1647246752358!5m2!1sen!2suk"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 