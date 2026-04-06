import { type ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'ar', name: 'العربية' },
  { code: 'zh', name: '中文' },
];

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language.split('-')[0];
  const selectedLanguage = languages.some((lang) => lang.code === currentLanguage)
    ? currentLanguage
    : 'en';

  const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div className="relative min-w-[150px]">
      <select
        value={selectedLanguage}
        onChange={handleLanguageChange}
        className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 pr-10 text-sm font-medium text-gray-900 shadow-sm outline-none transition hover:border-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:border-gray-500 dark:focus:border-primary-400 dark:focus:ring-primary-400"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
      <Globe className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
    </div>
  );
}