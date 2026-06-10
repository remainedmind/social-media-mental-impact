import React from 'react';
import { useTranslation } from '../contexts/TranslationContext';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useTranslation();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'pl' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="btn-primary lang-switcher"
      style={{
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        padding: '0.5rem 1rem',
        fontSize: '0.9rem',
        fontWeight: 'bold',
        background: 'var(--bg-card)',
        color: 'var(--text-primary)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
        boxShadow: 'var(--shadow-sm)',
        zIndex: 1000,
        transition: 'all 0.2s ease'
      }}
      aria-label="Toggle language"
    >
      {language === 'en' ? 'PL' : 'EN'}
    </button>
  );
};
