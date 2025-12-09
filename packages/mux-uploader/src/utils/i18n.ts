import type { TranslateDictionary, TranslateKeys } from '../lang/en.js';
import { En } from '../lang/en.js';
import { Es } from '../lang/es.js';
import { Fr } from '../lang/fr.js';
import { De } from '../lang/de.js';
import { Pt } from '../lang/pt.js';
import { It } from '../lang/it.js';
import { Zh } from '../lang/zh.js';

const translationsLanguages: Record<string, TranslateDictionary> = {
  en: En,
  es: Es,
  fr: Fr,
  de: De,
  pt: Pt,
  it: It,
  zh: Zh,
};

export const addTranslation = (langCode: string, languageDictionary: TranslateDictionary) => {
  translationsLanguages[langCode] = languageDictionary;
  if (!supportedLocales.includes(langCode)) {
    supportedLocales.push(langCode);
  }
};

const getBrowserLanguage = (): string => {
  if (typeof globalThis.navigator === 'undefined' || !globalThis.navigator.language) {
    return 'en';
  }
  return globalThis.navigator.language.split('-')[0];
};

const supportedLocales = ['en', 'es', 'fr', 'de', 'pt', 'it', 'zh'];

const getEffectiveLocale = (locale?: string | null): string => {
  // Use provided locale if supported
  if (locale && supportedLocales.includes(locale)) {
    return locale;
  }
  // Otherwise, use browser language if supported
  const browserLang = getBrowserLanguage();
  if (supportedLocales.includes(browserLang)) {
    return browserLang;
  }
  // Fallback to English
  return 'en';
};

export const t = (key: TranslateKeys, locale?: string | null) => {
  const effectiveLocale = getEffectiveLocale(locale);
  const dictionary = translationsLanguages[effectiveLocale] || En;
  return dictionary[key] || En[key];
};
