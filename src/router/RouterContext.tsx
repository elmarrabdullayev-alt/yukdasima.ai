import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Lang, splitLangPath, isRuDictionaryLoaded } from '../i18n';
import { localizeHref } from '../i18n/paths';

interface RouterContextType {
  /** Language-neutral path ("/ru/elaqe" → "/elaqe"); page routing uses this. */
  pathname: string;
  /** Language of the current page, taken from the URL ("/ru/..." → ru). */
  lang: Lang;
  /** Full path as in the address bar, including the /ru prefix. */
  fullPath: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextType>({
  pathname: '/',
  lang: 'az',
  fullPath: '/',
  navigate: () => {},
});

export const useRouter = () => useContext(RouterContext);

function normalizePath(p: string): string {
  return p.endsWith('/') && p.length > 1 ? p.slice(0, -1) : p || '/';
}

export const RouterProvider: React.FC<{ children: React.ReactNode; initialPath?: string }> = ({
  children,
  initialPath,
}) => {
  const [fullPath, setFullPath] = useState<string>(() => {
    if (initialPath) {
      return normalizePath(initialPath);
    }
    if (typeof window !== 'undefined') {
      return normalizePath(window.location.pathname);
    }
    return '/';
  });

  const { lang, path: pathname } = splitLangPath(fullPath);

  useEffect(() => {
    const handlePopState = () => {
      const normalized = normalizePath(window.location.pathname);
      // Going back across languages: reload so the page is rendered with the right dictionary
      if (splitLangPath(normalized).lang === 'ru' && !isRuDictionaryLoaded()) {
        window.location.reload();
        return;
      }
      setFullPath(normalized);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback(
    (to: string) => {
      if (to.startsWith('#')) {
        const el = document.getElementById(to.slice(1));
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }

      // On Russian pages, links to pages that exist in Russian stay in Russian
      const cleanTo = normalizePath(localizeHref(to, lang));

      if (typeof window !== 'undefined') {
        // The Russian dictionary is loaded with the page; switching language needs a full page load
        if (splitLangPath(cleanTo).lang !== lang && splitLangPath(cleanTo).lang === 'ru' && !isRuDictionaryLoaded()) {
          window.location.assign(cleanTo);
          return;
        }
        if (window.location.pathname !== cleanTo) {
          window.history.pushState({}, '', cleanTo);
          setFullPath(cleanTo);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    },
    [lang]
  );

  return (
    <RouterContext.Provider value={{ pathname, lang, fullPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const Link: React.FC<LinkProps> = ({ href: rawHref, children, className, id, onClick, ...rest }) => {
  const { navigate, lang } = useRouter();
  // On Russian pages, links point to the Russian version of the page when it exists
  const href = localizeHref(rawHref, lang);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }

    // Allow default behavior for external links, target="_blank", or modifier keys
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.altKey ||
      e.shiftKey ||
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('tel:') ||
      href.startsWith('mailto:') ||
      rest.target === '_blank'
    ) {
      return;
    }

    e.preventDefault();
    navigate(href);
  };

  return (
    <a id={id} href={href} className={className} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
};
