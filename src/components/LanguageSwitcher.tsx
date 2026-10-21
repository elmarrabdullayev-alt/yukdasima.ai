import React from 'react';
import { useRouter } from '../router/RouterContext';
import { alternateLangHref } from '../i18n/paths';
import { Lang } from '../i18n';

const LANGS: Array<{ code: Lang; label: string; name: string }> = [
  { code: 'az', label: 'AZ', name: 'Azərbaycan dili' },
  { code: 'ru', label: 'RU', name: 'Русский язык' },
];

/**
 * AZ | RU switch. Opens the same page in the other language (or the Russian home page when a
 * page has no Russian version yet). Uses a normal link so the page loads with the right
 * language from the start.
 */
export const LanguageSwitcher: React.FC<{ className?: string }> = ({ className = 'flex' }) => {
  const { fullPath, lang } = useRouter();

  return (
    <div
      className={`items-center rounded-lg border border-slate-200 bg-white p-0.5 text-xs font-bold ${className}`}
      role="group"
      aria-label="Dil / Язык"
    >
      {LANGS.map((item) => {
        const isActive = item.code === lang;
        return (
          <a
            key={item.code}
            href={alternateLangHref(fullPath, item.code)}
            hrefLang={item.code}
            lang={item.code}
            aria-label={item.name}
            aria-current={isActive ? 'true' : undefined}
            className={`px-2 py-1 rounded-md transition-colors ${
              isActive ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {item.label}
          </a>
        );
      })}
    </div>
  );
};
