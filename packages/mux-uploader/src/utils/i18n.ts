import en from '../../lang/en.json';
import es from '../../lang/es.json';
import fr from '../../lang/fr.json';
import de from '../../lang/de.json';

const DEFAULT_LOCALE = 'en';

const languages: Record<string, any> = {
  en,
  es,
  fr,
  de,
};

// Function to translate text based on locale
export function i18n(str: string, locale: string = DEFAULT_LOCALE) {
  const message = (languages[locale] as any)?.[str] ?? str;
  return new IntlMessageFormat(message, locale);
}

// Function to detect browser locale
export function detectBrowserLocale(): string {
  if (typeof navigator !== 'undefined' && navigator.language) {
    const browserLang = navigator.language.split('-')[0];
    const supportedLocales = Object.keys(languages);
    return supportedLocales.includes(browserLang) ? browserLang : DEFAULT_LOCALE;
  }
  return DEFAULT_LOCALE;
}

/**
 * Poor man's IntlMessageFormat, enrich if need be.
 * @see https://formatjs.io/docs/intl-messageformat/
 */
class IntlMessageFormat {
  message: string;
  locale: string;

  /** @TODO re-implement esbuild custom plugin for code usage (CJP) */
  constructor(message: string, locale = DEFAULT_LOCALE) {
    this.message = message;
    this.locale = locale;
  }

  format(values: Record<string, any>): string {
    return this.message.replace(/\{(\w+)\}/g, (_match, key) => {
      return values[key] ?? '';
    });
  }

  toString() {
    return this.message;
  }
}
