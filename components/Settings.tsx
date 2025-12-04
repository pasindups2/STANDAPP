
import React from 'react';
import { Theme, UserProfile, Language } from '../types';

interface SettingsProps {
  currentTheme: Theme;
  currentLanguage: Language;
  onThemeChange: (theme: Theme) => void;
  onLanguageChange: (lang: Language) => void;
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ currentTheme, currentLanguage, onThemeChange, onLanguageChange, onClose }) => {
  const isSi = currentLanguage === Language.SINHALA;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-neutral-50 rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden flex flex-col border border-neutral-200">
        <div className="p-5 border-b border-neutral-200 flex justify-between items-center bg-white">
          <h2 className="text-xl font-bold text-neutral-900">
            {isSi ? 'සැකසුම්' : 'Settings'}
          </h2>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Theme Section */}
          <div>
            <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-4">
              {isSi ? 'තේමාව' : 'Theme'}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => onThemeChange(Theme.COLORFUL)}
                className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${
                  currentTheme === Theme.COLORFUL
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-neutral-200 bg-white text-neutral-600 hover:border-indigo-200'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-rose-500 shadow-sm"></div>
                <span className="font-semibold text-sm">{isSi ? 'වර්ණවත්' : 'Colorful'}</span>
              </button>

              <button
                onClick={() => onThemeChange(Theme.DARK)}
                className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${
                  currentTheme === Theme.DARK
                    ? 'border-neutral-800 bg-neutral-800 text-white'
                    : 'border-neutral-200 bg-black text-neutral-400 hover:border-neutral-400'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-900 to-gray-500 border border-white/20 shadow-sm"></div>
                <span className="font-semibold text-sm">{isSi ? 'අඳුරු' : 'Dark'}</span>
              </button>
            </div>
          </div>

          {/* Language Section */}
          <div>
            <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-4">
              {isSi ? 'භාෂාව' : 'Language'}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => onLanguageChange(Language.ENGLISH)}
                className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${
                  currentLanguage === Language.ENGLISH
                    ? 'border-brand-500 bg-brand-50 text-brand-700'
                    : 'border-neutral-200 bg-white text-neutral-600 hover:border-brand-200'
                }`}
              >
                <span className="text-2xl">🇬🇧</span>
                <span className="font-semibold text-sm">English</span>
              </button>

              <button
                onClick={() => onLanguageChange(Language.SINHALA)}
                className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${
                  currentLanguage === Language.SINHALA
                    ? 'border-brand-500 bg-brand-50 text-brand-700'
                    : 'border-neutral-200 bg-white text-neutral-600 hover:border-brand-200'
                }`}
              >
                <span className="text-2xl">🇱🇰</span>
                <span className="font-semibold text-sm">සිංහල</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white border-t border-neutral-200">
          <button onClick={onClose} className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold transition">
             {isSi ? 'හරි' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
