import { Lang, RU_PREFIX, splitLangPath } from './index';

/**
 * Pages that have a Russian version (under /ru). Route pages such as /yukdasima/baki-gence
 * exist only in Azerbaijani for now, so links to them always point to the Azerbaijani page.
 * Must stay in sync with PAGE_SEO_CONFIGS (checked by a test).
 */
export const RU_AVAILABLE_PATHS: readonly string[] = [
  '/',
  '/yukdasima',
  '/evakuator',
  '/evden-eve-yukdasima',
  '/mebel-dasinmasi',
  '/ofis-dasinmasi',
  '/yuk-masini',
  '/fehle-xidmeti',
  '/qiymetler',
  '/elaqe',
];

const RU_AVAILABLE_SET = new Set(RU_AVAILABLE_PATHS);

export function hasRuVersion(path: string): boolean {
  return RU_AVAILABLE_SET.has(path);
}

/** Adds the /ru prefix to a language-neutral path when the page exists in Russian. */
export function toRuPath(path: string): string {
  return path === '/' ? RU_PREFIX : `${RU_PREFIX}${path}`;
}

/**
 * Returns the address an internal link should use in the given language.
 * Hash links, external links and already-prefixed paths are returned unchanged.
 */
export function localizeHref(href: string, lang: Lang): string {
  if (lang !== 'ru' || !href.startsWith('/')) return href;
  if (href === RU_PREFIX || href.startsWith(`${RU_PREFIX}/`)) return href;

  const cut = href.search(/[?#]/);
  const pathPart = cut === -1 ? href : href.slice(0, cut);
  const rest = cut === -1 ? '' : href.slice(cut);
  const normalized = pathPart.length > 1 && pathPart.endsWith('/') ? pathPart.slice(0, -1) : pathPart;

  return hasRuVersion(normalized) ? `${toRuPath(normalized)}${rest}` : href;
}

/** Address of the same page in the other language (falls back to the home page). */
export function alternateLangHref(fullPath: string, target: Lang): string {
  const { path } = splitLangPath(fullPath);
  if (target === 'az') return path;
  return hasRuVersion(path) ? toRuPath(path) : RU_PREFIX;
}
