import React, { createContext, useContext, useState, useCallback } from 'react';
import fr, { TranslationKeys } from '../translations/fr';
import ht from '../translations/ht';

export type Language = 'fr' | 'ht';

const dictionaries: Record<Language, TranslationKeys> = { fr, ht };

// Resolve a dot-path like "nav.home" from a nested object
function resolve(obj: Record<string, unknown>, path: string): string {
  const parts = path.split('.');
  let current: unknown = obj;
  for (const part of parts) {
    if (current == null || typeof current !== 'object') return path;
    current = (current as Record<string, unknown>)[part];
  }
  return typeof current === 'string' ? current : path;
}

interface LanguageContextValue {
  language: Language;
  setLanguage: (l: Language) => void;
  t: (key: string) => string;
  dict: TranslationKeys;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = 'hdaily-lang';

function getInitialLang(): Language {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'fr' || saved === 'ht') return saved;
    const browser = navigator.language.slice(0, 2).toLowerCase();
    if (browser === 'ht') return 'ht';
  } catch { /* ignore */ }
  return 'fr';
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLang);

  const setLanguage = useCallback((l: Language) => {
    setLanguageState(l);
    try { localStorage.setItem(STORAGE_KEY, l); } catch { /* ignore */ }
  }, []);

  const dict = dictionaries[language];

  const t = useCallback(
    (key: string) => resolve(dict as unknown as Record<string, unknown>, key),
    [dict],
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dict }}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}
