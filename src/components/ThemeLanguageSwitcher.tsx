import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage, Language } from '../context/LanguageContext';

interface Props {
  compact?: boolean; // used in mobile menu (stacks vertically)
}

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'ht', label: 'Kreyòl', flag: '🇭🇹' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
];

const ThemeLanguageSwitcher: React.FC<Props> = ({ compact }) => {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const current = LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  const LanguageMenu = (
    <div
      className={`absolute ${compact ? 'left-0' : 'right-0'} top-full mt-2 w-40 bg-hd-surface border border-hd-border rounded-xl shadow-lg overflow-hidden z-50`}
      role="menu"
    >
      {LANGUAGES.map(({ code, label, flag }) => (
        <button
          key={code}
          role="menuitem"
          onClick={() => handleSelect(code)}
          className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-left transition-colors ${
            language === code
              ? 'bg-hd-primary/10 text-hd-primary font-semibold'
              : 'text-hd-secondary hover:bg-hd-light'
          }`}
        >
          <span className="text-base leading-none">{flag}</span>
          <span>{label}</span>
          {language === code && <i className="fas fa-check ml-auto text-xs"></i>}
        </button>
      ))}
    </div>
  );

  if (compact) {
    return (
      <div className="flex items-center gap-3 px-3 py-2">
        {/* Language menu trigger */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsOpen((v) => !v)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-hd-border bg-hd-light text-hd-secondary hover:border-hd-primary hover:text-hd-primary transition-all"
            aria-haspopup="menu"
            aria-expanded={isOpen}
            aria-label="Choisir la langue"
          >
            <i className="fas fa-globe text-xs"></i>
            <span>{current.flag}</span>
          </button>
          {isOpen && LanguageMenu}
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
      {/* Language icon trigger */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="w-8 h-8 rounded-full flex items-center justify-center border border-hd-border bg-hd-light text-hd-secondary hover:border-hd-primary hover:text-hd-primary transition-all"
          aria-haspopup="menu"
          aria-expanded={isOpen}
          aria-label="Choisir la langue"
          title="Français / Kreyòl / English"
        >
          <i className="fas fa-globe text-xs"></i>
        </button>
        {isOpen && LanguageMenu}
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
