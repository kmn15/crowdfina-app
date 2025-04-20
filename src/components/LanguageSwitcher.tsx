import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-orange-500 dark:text-gray-300 dark:hover:text-orange-500">
        <Globe className="h-5 w-5" />
        <span className="uppercase">{language}</span>
      </button>
      <div className="absolute right-0 mt-2 w-24 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        <button
          onClick={() => setLanguage('en')}
          className={`w-full px-4 py-2 text-left hover:bg-orange-50 dark:hover:bg-gray-700 ${
            language === 'en' ? 'text-orange-500 dark:text-orange-400' : 'text-gray-600 dark:text-gray-300'
          }`}
        >
          English
        </button>
        <button
          onClick={() => setLanguage('fr')}
          className={`w-full px-4 py-2 text-left hover:bg-orange-50 dark:hover:bg-gray-700 ${
            language === 'fr' ? 'text-orange-500 dark:text-orange-400' : 'text-gray-600 dark:text-gray-300'
          }`}
        >
          Français
        </button>
      </div>
    </div>
  );
} 