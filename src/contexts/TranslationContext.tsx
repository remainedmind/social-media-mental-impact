import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../utils/translations';
import type { Language, TranslationKey } from '../utils/translations';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pl'); // Default, will be updated in useEffect

  useEffect(() => {
    // Detect browser language on mount
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'pl') {
      setLanguage('pl');
    } else {
      setLanguage('en');
    }
  }, []);

  const t = (key: TranslationKey): string => {
    // Use the nested key to access the translation (e.g. 'header.title')
    const keys = key.split('.');
    let result: any = translations[language];
    
    for (const k of keys) {
      if (result && result[k]) {
        result = result[k];
      } else {
        console.warn(`Missing translation key: ${key} for language: ${language}`);
        return key;
      }
    }
    
    return result as string;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
