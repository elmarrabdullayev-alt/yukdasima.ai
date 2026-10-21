/**
 * Minimal i18n layer (Azerbaijani is the source language, Russian is a translation).
 *
 * How it works:
 * - Every visible text in the UI is written in Azerbaijani, as before, and passed through `t()`.
 * - When the current language is Azerbaijani, `t()` returns its input unchanged, so the
 *   Azerbaijani site renders exactly as it did before this layer existed.
 * - When the current language is Russian, `t()` looks the Azerbaijani text up in the Russian
 *   dictionary (src/i18n/ru.ts). Texts built from templates (e.g. "Bakıdan {0} ...") are matched
 *   with patterns whose `{0}`, `{1}` parts are filled in (and translated, if they are known words).
 * - Business logic (prices, tariffs, form values, Telegram messages) keeps using the Azerbaijani
 *   values; only what is shown on screen is translated.
 *
 * The Russian dictionary is loaded only for Russian pages, so Azerbaijani visitors do not
 * download it.
 */

export type Lang = 'az' | 'ru';

export const DEFAULT_LANG: Lang = 'az';
export const RU_PREFIX = '/ru';

let currentLang: Lang = DEFAULT_LANG;
let ruDictionary: Record<string, string> | null = null;
let ruPatterns: Array<{ re: RegExp; template: string }> = [];

export function setLang(lang: Lang): void {
  currentLang = lang;
}

export function getLang(): Lang {
  return currentLang;
}

export function isRuDictionaryLoaded(): boolean {
  return ruDictionary !== null;
}

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Registers the Russian dictionary. Keys are Azerbaijani texts (trimmed); keys that contain
 * `{0}`, `{1}` ... are templates used for texts that include changing values.
 */
export function registerRuDictionary(dictionary: Record<string, string>): void {
  ruDictionary = dictionary;
  ruPatterns = [];
  for (const [key, template] of Object.entries(dictionary)) {
    if (!/\{\d+\}/.test(key)) continue;
    const parts = key.split(/\{\d+\}/);
    const source = parts.map(escapeRegExp).join('([\\s\\S]*?)');
    ruPatterns.push({ re: new RegExp(`^${source}$`), template: key + '\u0000' + template });
  }
  // Longer (more specific) templates first
  ruPatterns.sort((a, b) => b.template.length - a.template.length);
}

function translateCore(core: string): string | undefined {
  if (!ruDictionary) return undefined;
  const direct = ruDictionary[core];
  if (direct !== undefined) return direct;

  for (const { re, template } of ruPatterns) {
    const match = core.match(re);
    if (!match) continue;
    const [key, translated] = template.split('\u0000');
    const indexes = Array.from(key.matchAll(/\{(\d+)\}/g)).map((m) => Number(m[1]));
    let result = translated;
    indexes.forEach((index, position) => {
      const value = match[position + 1] ?? '';
      const translatedValue = ruDictionary![value.trim()] ?? value;
      result = result.split(`{${index}}`).join(translatedValue);
    });
    return result;
  }
  return undefined;
}

/**
 * Translates a visible text into the current language.
 * Non-string values (numbers, React elements, arrays, booleans) are returned unchanged,
 * so it is safe to wrap any `{expression}` rendered in JSX.
 */
export function t<T>(value: T): T {
  if (currentLang === DEFAULT_LANG || typeof value !== 'string' || !ruDictionary) return value;
  const text = value as unknown as string;
  if (!text.trim()) return value;

  // Keep leading/trailing spaces (they matter between inline JSX elements)
  const match = text.match(/^(\s*)([\s\S]*?)(\s*)$/);
  const lead = match ? match[1] : '';
  const core = match ? match[2] : text;
  const trail = match ? match[3] : '';

  const translated = translateCore(core);
  if (translated === undefined) return value;
  return (lead + translated + trail) as unknown as T;
}

/** Translates a text into the given language, regardless of the current page language. */
export function translateTo<T>(value: T, lang: Lang): T {
  const previous = currentLang;
  currentLang = lang;
  try {
    return t(value);
  } finally {
    currentLang = previous;
  }
}

/** Splits a URL path into language and the language-neutral path ("/ru/elaqe" → ru, "/elaqe"). */
export function splitLangPath(path: string): { lang: Lang; path: string } {
  const clean = path || '/';
  if (clean === RU_PREFIX || clean === `${RU_PREFIX}/`) return { lang: 'ru', path: '/' };
  if (clean.startsWith(`${RU_PREFIX}/`)) return { lang: 'ru', path: clean.slice(RU_PREFIX.length) || '/' };
  return { lang: 'az', path: clean };
}
