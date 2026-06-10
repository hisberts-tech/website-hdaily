import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage, Language } from '../context/LanguageContext';

interface Props {
  compact?: boolean; // used in mobile menu (stacks vertically)
}

const ThemeLanguageSwitcher: React.FC<Props> = ({ compact }) => {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const languages: { code: Language; label: string }[] = [
    { code: 'fr', label: 'FR' },
    { code: 'ht', label: 'HT' },
  ];

  if (compact) {
    return (
      <div className="flex items-center gap-3 px-3 py-2">
        {/* Language toggle */}
        <div className="flex items-center gap-1 bg-hd-light rounded-full p-0.5 border border-hd-border">
          {languages.map(({ code, label }) => (
            <button
              key={code}
              onClick={() => setLanguage(code)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                language === code
                  ? 'bg-hd-primary text-white shadow-sm'
                  : 'text-hd-muted hover:text-hd-secondary'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Theme toggle */}
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-hd-border bg-hd-light text-hd-secondary hover:border-hd-primary hover:text-hd-primary transition-all"
          title={theme === 'light' ? t('theme.dark') : t('theme.light')}
        >
          <i className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'} text-xs`}></i>
          <span>{theme === 'light' ? t('theme.dark') : t('theme.light')}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {/* Language pills */}
      <div className="flex items-center bg-hd-light rounded-full p-0.5 border border-hd-border">
        {languages.map(({ code, label }) => (
          <button
            key={code}
            onClick={() => setLanguage(code)}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              language === code
                ? 'bg-hd-primary text-white shadow-sm'
                : 'text-hd-muted hover:text-hd-secondary'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Theme icon button */}
      <button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="w-8 h-8 rounded-full flex items-center justify-center border border-hd-border bg-hd-light text-hd-secondary hover:border-hd-primary hover:text-hd-primary transition-all"
        title={theme === 'light' ? t('theme.dark') : t('theme.light')}
        aria-label="Toggle theme"
      >
        <i className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'} text-xs`}></i>
      </button>
    </div>
  );
};

export default ThemeLanguageSwitcher;
