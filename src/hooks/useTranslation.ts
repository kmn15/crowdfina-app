import { useLanguage } from '../contexts/LanguageContext';

export function useTranslation() {
  const context = useLanguage();
  return context;
} 