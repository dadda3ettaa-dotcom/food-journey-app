import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LANGUAGES: { code: 'de' | 'en' | 'fr' | 'ar'; label: string }[] = [
  { code: 'de', label: 'DE' },
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'ar', label: 'AR' }
];

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.resolvedLanguage || i18n.language || 'de';

  return (
    <div className="flex items-center gap-1 px-1.5 py-1 rounded-full bg-stone-100 border border-stone-200/80">
      <Globe className="w-3.5 h-3.5 text-stone-500 ml-0.5" />
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          type="button"
          onClick={() => i18n.changeLanguage(lang.code)}
          className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold transition-colors ${
            currentLang === lang.code
              ? 'bg-stone-900 text-white'
              : 'text-stone-500 hover:text-stone-800'
          }`}
          aria-current={currentLang === lang.code ? 'true' : undefined}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};
