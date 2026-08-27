import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import de from './locales/de/common.json';
import en from './locales/en/common.json';
import fr from './locales/fr/common.json';
import ar from './locales/ar/common.json';

export const RTL_LANGUAGES = ['ar'];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      de: { common: de },
      en: { common: en },
      fr: { common: fr },
      ar: { common: ar }
    },
    fallbackLng: 'de',
    supportedLngs: ['de', 'en', 'fr', 'ar'],
    defaultNS: 'common',
    ns: ['common'],
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

function applyDirection(lng: string) {
  const dir = RTL_LANGUAGES.includes(lng) ? 'rtl' : 'ltr';
  document.documentElement.dir = dir;
  document.documentElement.lang = lng;
}

applyDirection(i18n.resolvedLanguage || i18n.language || 'de');

i18n.on('languageChanged', (lng) => {
  applyDirection(lng);
});

export default i18n;
